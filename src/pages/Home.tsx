import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import PinataClient from "../utils/pinataClient";
import { getVariable, Variable } from "../utils/getVariable";
import {
  configuraTokenURI,
  mintNFT as MT,
  getBalance,
  getOwnedNFTs,
} from "../utils/ethersFacade";
import { AppContext } from "../context/AppContext";
import MintedNFT, { Props as NFTMetadata } from "../components/MintedNFT";
import Snackbar from "../components/Snackbar";

function Home(): JSX.Element {
  const pinataClient = new PinataClient(
    getVariable(Variable.REACT_APP_PINATA_API_KEY),
    getVariable(Variable.REACT_APP_PINATA_API_SECRET)
  );
  const [selectedImage, setSelectedImage] = useState<Blob | null>();
  const [mintedNFTs, setMintedNFTs] = useState<Array<NFTMetadata>>([]);
  const [NFTName, setNFTName] = useState<string>("");
  const [NFTDescription, setNFTDescription] = useState<string>("");
  const [snackbar, setSnackbar] = useState<
    "info" | "success" | "error" | "default"
  >("default");
  const { contract, setBalance, account } = useContext(AppContext);

  useEffect(() => {
    const mintedNFTsJSON = localStorage.mintedNFT;
    if (mintedNFTsJSON) {
      setMintedNFTs(JSON.parse(mintedNFTsJSON));
    }
  }, []);

  useEffect(() => {
    if (!contract) return;
    // getOwnedNFTs(account, contract).then(console.log).catch(console.error);
  }, [contract]);

  function resetFields() {
    setSelectedImage(null);
    setNFTName("");
    setNFTDescription("");
  }

  async function mintNFT() {
    if (selectedImage) {
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
        const tx = await MT(tokenURI, contract);
        setMintedNFTs((_mintedNFTs) => {
          const updatedMintedNFTs = [
            ..._mintedNFTs,
            {
              tokenId: tx.nonce,
              transactionId: tx.hash,
              ipfsLink: uploadResult.imageHash,
              name: NFTName,
              description: NFTDescription,
            },
          ];

          localStorage.mintedNFT = JSON.stringify(updatedMintedNFTs);
          return updatedMintedNFTs;
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
      <div className="max-w-[1400px] mx-auto md:px-8 md:py-8 flex">
        <div>
          <div className="rounded-xl px-3 py-2 bg-gray-600/70">
            <h1 className="pl-2 text-xl font-semibold mb-3">Mint</h1>

            <div className="bg-gray-700 rounded-md h-96 w-[40rem] mx-auto grid place-items-center">
              {selectedImage ? (
                <div className="max-w-md">
                  <img
                    className="mb-4 max-h-80"
                    alt="image"
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
              ) : (
                <>
                  <label
                    onDragOver={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setSelectedImage(event.dataTransfer?.files?.[0]);
                    }}
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer rounded-lg bg-gray-600 hover:bg-gray-500 h-80 w-[38rem]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      className="block"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span className="block mt-5 text-gray-300">
                      Drag and drop or click to upload
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    className="hidden"
                    type="file"
                    accept=".jpg,.png,.jpeg,.webp"
                    name="uploadImage"
                    onChange={(event) => {
                      console.log(event.target?.files?.item(0));
                      setSelectedImage(event.target?.files?.[0]);
                    }}
                  />
                </>
              )}
            </div>

            {selectedImage && (
              <div className="flex items-center justify-between mt-3">
                <div className="flex">
                  <input
                    className="block px-3 py-[6px] text-sm rounded dark:bg-gray-700 dark:placeholder:text-gray-500 outline-1 outline-slate-600 focus:outline"
                    type="text"
                    onChange={(event) => setNFTName(event.target.value)}
                    placeholder="NFT Name"
                  />
                  <input
                    className="ml-1 block px-3 py-[6px] text-sm rounded dark:bg-gray-700 dark:placeholder:text-gray-500 outline-1 outline-slate-600 focus:outline"
                    type="text"
                    onChange={(event) => setNFTDescription(event.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="flex text-sm">
                  <button
                    className="py-2 px-3 bg-red-600 rounded-xl"
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
                    className="py-2 pl-2 pr-3 ml-2 bg-green-600 rounded-xl flex items-center"
                    onClick={mintNFT}
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
                    <span className="block ml-1">Mint</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <aside className="px-10">
          <h1 className="text-xl font-semibold mb-3">Minted NFTs</h1>
          <div>
            {mintedNFTs.length > 0 ? (
              mintedNFTs.map((nft) => (
                <MintedNFT
                  key={nft.tokenId}
                  tokenId={nft.tokenId}
                  transactionId={nft.transactionId}
                  ipfsLink={nft.ipfsLink}
                  description={nft.description}
                  name={nft.name}
                />
              ))
            ) : (
              <div className="pt-4 text-center text-xs text-gray-500 font-bold uppercase">
                <span>Your newly minted NFT will show here.</span>
              </div>
            )}
          </div>
        </aside>
      </div>
      <AnimatePresence>
        {snackbar != "default" && <Snackbar type={snackbar} />}
      </AnimatePresence>
    </>
  );
}

export default Home;
