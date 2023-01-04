import React, { ReactNode, useEffect, useState } from "react";

import {
  connectToWallet,
  getBalance,
  getContract,
  getChainInfo,
  ChainInfo,
  notConnectedChainInfo,
  reloadOnNetworkChange,
  getOwnedNFTs,
} from "../utils/ethersFacade";
import { getVariable, Variable } from "../utils/getVariable";
import type { Props as NFTMetadata } from "../components/MintedNFT";

type Props = {
  children: ReactNode;
};

type Context = {
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
  mintedNFTs: Array<NFTMetadata>;
  setMintedNFTs: React.Dispatch<React.SetStateAction<Array<NFTMetadata>>>;
};

export const AppContext = React.createContext<Context>({} as Context);

export function AppContextProvider({ children }: Props) {
  const [account, setAccount] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [balance, setBalance] = useState<string>("0.000");
  const [chainInfo, setChainInfo] = useState<ChainInfo>(notConnectedChainInfo);
  const [mintedNFTs, setMintedNFTs] = useState<Array<NFTMetadata>>([]);

  useEffect(() => {
    const connectProcess = async () => {
      const signer = await connectToWallet();
      const address = await signer.getAddress();
      if (address !== "") {
        const erc721SC = getContract(
          getVariable(Variable.REACT_APP_CCHAIN_CONTRACT_ADDRESS),
          signer
        );

        const _balance = await getBalance(address);
        const ownedNFTs = await getOwnedNFTs(address, erc721SC);

        setAccount(address);
        setBalance(_balance);
        setContract(erc721SC);
        setWallet(signer);
        setMintedNFTs(ownedNFTs);
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
        mintedNFTs,
        setMintedNFTs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
