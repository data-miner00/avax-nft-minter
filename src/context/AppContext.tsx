import React, { ReactNode, useEffect, useState } from "react";

import {
  connectToWallet,
  getBalance,
  getContract,
  getChainInfo,
  ChainInfo,
  notConnectedChainInfo,
  reloadOnNetworkChange,
} from "../utils/ethersFacade";
import { getVariable, Variable } from "../utils/getVariable";

interface Props {
  children: ReactNode;
}

export interface Context {
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  wallet: any;
  setWallet: React.Dispatch<any>;
  contract: any;
  setContract: React.Dispatch<any>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  chainInfo: ChainInfo;
  setChainInfo: React.Dispatch<React.SetStateAction<ChainInfo>>;
}

export const AppContext: React.Context<Context> = React.createContext<Context>(
  {} as Context
);

export function AppContextProvider({ children }: Props): JSX.Element {
  const [account, setAccount] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [balance, setBalance] = useState<string>("0.000");
  const [chainInfo, setChainInfo] = useState<ChainInfo>(notConnectedChainInfo);

  useEffect(() => {
    const connectProcess = async (): Promise<void> => {
      const signer = await connectToWallet();
      const address = await signer.getAddress();
      if (address !== "") {
        const erc721SC = getContract(
          getVariable(Variable.REACT_APP_CCHAIN_CONTRACT_ADDRESS),
          signer
        );

        const _balance = await getBalance(address);

        setAccount(address);
        setBalance(_balance);
        setContract(erc721SC);
        setWallet(signer);
      }
    };

    connectProcess().catch(console.error);
    reloadOnNetworkChange();
  }, []);

  useEffect(() => {
    getChainInfo().then(setChainInfo).catch(console.error);
  }, [account, wallet]);

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        wallet,
        setWallet,
        contract,
        setContract,
        balance,
        setBalance,
        chainInfo,
        setChainInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
