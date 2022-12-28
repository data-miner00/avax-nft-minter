import React, { useState, useEffect, useContext } from "react";
import PinataClient from "../utils/pinataClient";
import { getVariable, Variable } from "../utils/getVariable";
import { configuraTokenURI, mintNFT as MT } from "../utils/ethersFacade";
import { AppContext } from "../context/AppContext";

type NFTMetadata = {
  tokenId: string;
  transactionId: string;
  ipfsLink: string;
};

function Home(): JSX.Element {
  const pinataClient = new PinataClient(
    getVariable(Variable.REACT_APP_PINATA_API_KEY),
    getVariable(Variable.REACT_APP_PINATA_API_SECRET)
  );
  const [selectedImage, setSelectedImage] = useState<Blob | null>();
  const [mintedNFTs, setMintedNFTs] = useState<Array<NFTMetadata>>([]);
  const [NFTName, setNFTName] = useState<string>("");
  const [NFTDescription, setNFTDescription] = useState<string>("");
  const { contract } = useContext(AppContext);

  useEffect(() => {
    console.log(mintedNFTs);
  }, [mintedNFTs]);

  async function mintNFT() {
    // if (selectedImage) {
    //   const uploadResult = await pinataClient.uploadImage(
    //     URL.createObjectURL(selectedImage),
    //     "custom-name"
    //   );
    //   const tokenURI = configuraTokenURI(
    //     uploadResult.imageHash,
    //     NFTName,
    //     NFTDescription
    //   );
    //   const tx = await MT(tokenURI, contract);
    //   setMintedNFTs((_mintedNFTs) => [
    //     ..._mintedNFTs,
    //     {
    //       tokenId: tx.nonce,
    //       transactionId: tx.hash,
    //       ipfsLink: uploadResult.imageHash,
    //     },
    //   ]);
    // }
  }

  return (
    <div className="max-w-[1400px] mx-auto md:px-8 md:py-8">
      <h1 className="text-3xl font-semibold text-center mb-20">
        Upload an image to be minted
      </h1>

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
          <div className="bg-gray-500 rounded-lg">
            <input
              className=""
              type="file"
              accept=".jpg,.png,.jpeg,.webp"
              name="uploadImage"
              onChange={(event) => {
                console.log(event.target?.files?.item(0));
                setSelectedImage(event.target?.files?.[0]);
              }}
            />
          </div>
        )}
      </div>

      {!selectedImage && (
        <div className="flex flex-col items-center">
          <div className="flex text-sm">
            <button
              className="p-2 bg-red-600 rounded-xl min-w-[80px]"
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </button>
            <button
              className="p-2 ml-2 bg-green-600 rounded-xl min-w-[80px]"
              onClick={mintNFT}
            >
              Mint
            </button>
          </div>
          <div>
            <input
              className="block px-3 py-2 mb-2 rounded dark:bg-gray-700 dark:placeholder:text-white outline-1 outline-slate-600 focus:outline"
              type="text"
              onChange={(event) => setNFTName(event.target.value)}
              placeholder="NFT Name"
            />
            <input
              className="block px-3 py-2 rounded dark:bg-gray-700 dark:placeholder:text-white outline-1 outline-slate-600 focus:outline"
              type="text"
              onChange={(event) => setNFTDescription(event.target.value)}
              placeholder="Description"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
