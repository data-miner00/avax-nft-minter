import React, { useContext, useEffect } from "react";

import { AppContext } from "../context/AppContext";
import MintedNFT from "../components/MintedNFT";

function Minted(): JSX.Element {
  const { mintedNFTs, setMintedNFTs } = useContext(AppContext);

  useEffect(() => {
    const mintedNFTsJSON = localStorage.mintedNFT;
    if (mintedNFTsJSON) {
      setMintedNFTs(JSON.parse(mintedNFTsJSON));
    }
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Minted;
