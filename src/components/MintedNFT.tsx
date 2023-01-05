import React from "react";

export type Props = {
  ipfsLink: string;
  name: string;
  description: string;
};

function MintedNFT({ ipfsLink, name, description }: Props): JSX.Element {
  return (
    <div className="rounded-lg bg-slate-200 dark:bg-gray-700 w-96 overflow-hidden">
      <div className="h-64 border-b border-solid border-gray-100 dark:border-gray-600 p-4 relative">
        <img
          className="block h-full mx-auto"
          data-testid="minted-img"
          src={`https://gateway.pinata.cloud/ipfs/${ipfsLink}`}
          alt={name}
        />

        <a
          title="View on IPFS"
          href={`https://gateway.pinata.cloud/ipfs/${ipfsLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block absolute p-2 cursor-pointer right-2 top-2 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-box-arrow-up-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            />
          </svg>
        </a>
      </div>
      <div className="p-4">
        <h3
          data-testid="minted-name"
          className="font-bold text-center mb-3 text-lg dark:text-gray-200"
        >
          {name}
        </h3>
        <p
          data-testid="minted-description"
          className="text-center dark:text-gray-200 text-sm"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default MintedNFT;
