import React, { useEffect, useRef, useContext } from "react";
import jazzicon from "@metamask/jazzicon";

import { AppContext } from "../context/AppContext";

function WalletManager(): JSX.Element {
  const { account, balance, chainInfo } = useContext(AppContext);
  const identiconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (account !== "" && identiconRef.current != null) {
      identiconRef.current.innerHTML = "";
      identiconRef.current.appendChild(
        jazzicon(20, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account]);

  const chainColors =
    chainInfo.chainId < 1
      ? "bg-rose-300/10 text-red-400"
      : chainInfo.isTestnet
      ? "bg-amber-300/10 text-yellow-400"
      : "bg-emerald-300/10 text-green-400";

  return (
    <div>
      {account !== "" ? (
        <div className="flex items-center">
          <div
            className={`flex items-center rounded-xl mr-1 ${chainColors} px-3 py-[6px] font-semibold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-wifi block mr-1"
              viewBox="0 0 16 16"
            >
              <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z" />
              <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />
            </svg>
            <span className="block">{chainInfo.chainName}</span>
          </div>
          <div className="font-mono flex bg-gray-200 dark:bg-gray-600 rounded-xl pl-3 pr-[2px] py-[2px] items-center">
            <div>
              {balance} {chainInfo.currency}
            </div>
            <div className="flex items-center ml-3 bg-gray-300/70 dark:bg-gray-700 py-1 rounded-xl pl-2 pr-2">
              <div>{`${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}</div>
              <div
                ref={identiconRef}
                className="h-5 w-5 rounded-full ml-2 overflow-hidden"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <button className="rounded-xl bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 block px-4 py-2 font-bold text-sm">
          Connect to a wallet
        </button>
      )}
    </div>
  );
}

export default WalletManager;
