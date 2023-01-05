import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";
import MintedNFT, { Props as NFTMetadata } from "../components/MintedNFT";
import { getOwnedNFTs } from "../utils/ethersFacade";

function Minted(): JSX.Element {
  const [mintedNFTs, setMintedNFTs] = useState<Array<NFTMetadata>>([]);
  const { account, contract } = useContext(AppContext);

  useEffect(() => {
    getOwnedNFTs(account, contract).then(setMintedNFTs).catch(console.error);
  }, [contract]);

  return (
    <div className="max-w-[1400px] mx-auto md:px-8">
      <h1 className="text-xl font-semibold mb-3">Minted NFTs</h1>

      {mintedNFTs.length > 0 ? (
        <div>
          {mintedNFTs.map((nft, index) => (
            <MintedNFT
              key={index}
              ipfsLink={nft.ipfsLink}
              description={nft.description}
              name={nft.name}
            />
          ))}
        </div>
      ) : (
        <div className="pt-4 text-center text-xs text-gray-500 font-bold uppercase">
          <span>Your newly minted NFT will show here.</span>
        </div>
      )}
    </div>
  );
}

export default Minted;
