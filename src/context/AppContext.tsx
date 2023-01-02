import React, { ReactNode, useEffect, useState } from "react";
import {
  connectToWallet,
  getBalance,
  getContract,
  getChainInfo,
  ChainInfo,
  notConnectedChainInfo,
} from "../utils/ethersFacade";
import { getVariable, Variable } from "../utils/getVariable";

type Props = {
  children: ReactNode;
};

export const AppContext = React.createContext<any>(null);

export function AppContextProvider({ children }: Props) {
  const [account, setAccount] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [balance, setBalance] = useState<string>("0.000");
  const [chainInfo, setChainInfo] = useState<ChainInfo>(notConnectedChainInfo);

  useEffect(() => {
    const connectProcess = async () => {
      const signer = await connectToWallet();
      const address = await signer.getAddress();
      if (address !== "") {
        setWallet(signer);
        const erc721SC = getContract(
          getVariable(Variable.REACT_APP_CCHAIN_CONTRACT_ADDRESS),
          signer
        );
        setAccount(address);
        setContract(erc721SC);
        const _balance = await getBalance(address);
        setBalance(_balance);
      }
    };

    connectProcess().catch(console.error);
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
