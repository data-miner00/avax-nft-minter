import React, { useState, useContext, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import PinataClient from "../utils/pinataClient";
import { getVariable, Variable } from "../utils/getVariable";
import {
  configuraTokenURI,
  mintNFT as MT,
  getBalance,
} from "../utils/ethersFacade";
import { AppContext } from "../context/AppContext";
import Snackbar from "../components/Snackbar";
import DragAndDropFilesArea from "../components/DragAndDropFilesArea";

function Home(): JSX.Element {
  const pinataClient = new PinataClient(
    getVariable(Variable.REACT_APP_PINATA_API_KEY),
    getVariable(Variable.REACT_APP_PINATA_API_SECRET)
  );
  const [selectedImage, setSelectedImage] = useState<Blob | null>();
  const NFTNameInputRef = useRef<HTMLInputElement>(null);
  const NFTDescriptionInputRef = useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState<
    "info" | "success" | "error" | "default"
  >("default");
  const { contract, setBalance, account } = useContext(AppContext);
  const { t } = useTranslation();

  function resetFields(): void {
    setSelectedImage(null);
    if (NFTNameInputRef.current != null) NFTNameInputRef.current.value = "";
    if (NFTDescriptionInputRef.current != null)
      NFTDescriptionInputRef.current.value = "";
  }

  async function mintNFT(): Promise<void> {
    const NFTName = NFTNameInputRef.current?.value;
    const NFTDescription = NFTDescriptionInputRef.current?.value;
    if (
      selectedImage != null &&
      NFTName !== undefined &&
      NFTDescription !== undefined
    ) {
      try {
        const uploadResult = await pinataClient.uploadImage(
          URL.createObjectURL(selectedImage),
          NFTName
        );
        const tokenURI = configuraTokenURI(
          uploadResult.imageHash,
          NFTName,
          NFTDescription
        );
        console.log(tokenURI);
        const tx = await MT(tokenURI, contract);
        console.log({
          tokenId: tx.nonce,
          transactionId: tx.hash,
          ipfsLink: uploadResult.imageHash,
          name: NFTName,
          description: NFTDescription,
        });

        setSnackbar("success");
        setBalance(await getBalance(account));
        resetFields();
        setTimeout(() => setSnackbar("default"), 3000);
      } catch {
        setSnackbar("error");
        setTimeout(() => setSnackbar("default"), 3000);
      }
    }
  }

  return (
    <>
      <div className="max-w-[1400px] mx-auto md:px-8 md:py-8 flex justify-center items-center">
        <div>
          <div className="rounded-xl px-3 py-2 bg-white dark:bg-gray-700 drop-shadow-lg mt-9">
            <h1 className="pl-2 text-xl font-semibold mb-3">{t("mint")}</h1>

            <div className="rounded-md h-96 w-[40rem] mx-auto grid place-items-center border border-solid border-gray-50 dark:border-gray-600">
              {selectedImage != null ? (
                <div className="max-w-md">
                  <img
                    className="mb-4 max-h-80"
                    alt="image"
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
              ) : (
                <DragAndDropFilesArea
                  onDrop={(event) =>
                    setSelectedImage(event.dataTransfer?.files?.[0])
                  }
                  onChange={(event) =>
                    setSelectedImage(event.target?.files?.[0])
                  }
                />
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex">
                <input
                  className="block px-3 py-[6px] text-sm rounded dark:bg-gray-700 dark:placeholder:text-gray-500 outline-1 outline-slate-600 focus:outline"
                  type="text"
                  ref={NFTNameInputRef}
                  placeholder={t("nft_name") ?? "NFT Name"}
                />
                <input
                  className="ml-1 block px-3 py-[6px] w-[320px] text-sm rounded dark:bg-gray-700 dark:placeholder:text-gray-500 outline-1 outline-slate-600 focus:outline"
                  type="text"
                  ref={NFTDescriptionInputRef}
                  placeholder={t("nft_description") ?? "Description"}
                />
              </div>
              <div className="flex text-sm">
                <button
                  className="py-2 px-3 bg-rose-400 text-rose-800 dark:text-white dark:bg-red-600 rounded-xl"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
                <button
                  className="py-2 pl-2 pr-3 ml-2 bg-emerald-400 text-emerald-800 dark:text-white dark:bg-green-600 rounded-xl flex items-center"
                  onClick={() => {
                    void mintNFT();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="block"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <span className="block ml-1">{t("mint")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {snackbar !== "default" && <Snackbar type={snackbar} />}
      </AnimatePresence>
    </>
  );
}

export default Home;
