import React, { useEffect, useRef, useContext } from "react";
import jazzicon from "@metamask/jazzicon";

import { AppContext } from "../context/AppContext";

function WalletManager(): JSX.Element {
  const { account, balance } = useContext(AppContext);
  const identiconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (account && identiconRef.current) {
      identiconRef.current.innerHTML = "";
      identiconRef.current.appendChild(
        jazzicon(20, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account]);

  return (
    <div>
      {account ? (
        <div className="font-mono flex bg-gray-600 rounded-xl pl-3 pr-[2px] py-[2px] items-center">
          <div>{balance} AVAX</div>
          <div className="flex items-center ml-3 bg-gray-700 py-1 rounded-xl pl-2 pr-2">
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
      ) : (
        <button className="rounded-xl bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 block px-4 py-2 font-bold text-sm">
          Connect to a wallet
        </button>
      )}
    </div>
  );
}

export default WalletManager;
