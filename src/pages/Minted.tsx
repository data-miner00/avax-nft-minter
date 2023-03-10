import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "../context/AppContext";
import MintedNFT, { Props as NFTMetadata } from "../components/MintedNFT";
import { getOwnedNFTs } from "../utils/ethersFacade";

function Minted(): JSX.Element {
  const [mintedNFTs, setMintedNFTs] = useState<NFTMetadata[]>([]);
  const { account, contract, chainInfo } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (contract == null && chainInfo.chainId !== 43113) return;
    getOwnedNFTs(account, contract).then(setMintedNFTs).catch(console.error);
  }, [contract, chainInfo]);

  return (
    <div className="max-w-[1400px] mx-auto md:px-8 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        {t("minted_nft")}
      </h1>

      {mintedNFTs.length > 0 ? (
        <div className="flex gap-5 flex-wrap justify-center">
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
          <span>{t("your_new_nft")}</span>
        </div>
      )}
    </div>
  );
}

export default Minted;
