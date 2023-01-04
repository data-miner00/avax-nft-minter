import React from "react";

export type Props = {
  tokenId: string;
  transactionId?: string;
  ipfsLink: string;
  name: string;
  description: string;
};

function MintedNFT({
  tokenId,
  transactionId,
  ipfsLink,
  name,
  description,
}: Props): JSX.Element {
  return (
    <div className="rounded-lg bg-gray-700 p-4 flex mb-4">
      <div className="w-64 bg-gray-800/10 rounded shrink-0">
        <img
          data-testid="minted-img"
          src={`https://gateway.pinata.cloud/ipfs/${ipfsLink}`}
          alt={name}
        />
      </div>
      <div className="ml-4">
        <div>
          <h3
            data-testid="minted-name"
            className="font-bold text-center mb-3 text-lg"
          >
            {name}{" "}
            <span
              data-testid="minted-tokenId"
              className="text-gray-300 text-base"
            >
              #{tokenId}
            </span>
          </h3>
          <p data-testid="minted-description" className="text-gray-200 text-sm">
            {description}
          </p>
        </div>
        <div className="py-2">
          {transactionId ? (
            <a
              data-testid="minted-view-tx-enabled"
              href={`https://testnet.snowtrace.io/tx/${transactionId}`}
              target="_blank"
              className="block text-sm bg-pink-500 p-2 rounded-full mb-1 font-bold text-center"
            >
              View on Snowtrace
            </a>
          ) : (
            <button
              data-testid="minted-view-tx-disabled"
              disabled
              className="block text-sm bg-pink-200 p-2 rounded-full mb-1 font-bold text-center"
            >
              View on Snowtrace
            </button>
          )}
          <a
            data-testid="minted-view-img"
            href={`https://gateway.pinata.cloud/ipfs/${ipfsLink}`}
            target="_blank"
            className="block text-sm bg-pink-500 p-2 rounded-full mb-1 font-bold text-center"
          >
            View on IPFS
          </a>
        </div>
      </div>
    </div>
  );
}

export default MintedNFT;
