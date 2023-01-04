import { addressEqual } from "@usedapp/core";
import ethers = require("ethers");
import abi from "../abis/abi.json";
import { Props as MintedNFT } from "../components/MintedNFT";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function connectToWallet(): Promise<ethers.providers.JsonRpcSigner> {
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export function getContract(
  address: string,
  signer: ethers.providers.JsonRpcSigner
): ethers.Contract {
  return new ethers.Contract(address, abi, signer);
}

export async function mintNFT(stringURI: string, contract: ethers.Contract) {
  const tx = await contract.mint(stringURI);
  console.log("Transaction: ", tx);
  await tx.wait();
  return tx;
}

export function configuraTokenURI(
  imageURL: string,
  name: string,
  description: string
) {
  return JSON.stringify({
    name,
    description,
    image: imageURL,
    attributes: [],
  });
}

export async function getBalance(account: string): Promise<string> {
  const balance = await provider.getBalance(account);
  const balanceInFixedString = parseFloat(
    ethers.utils.formatEther(balance)
  ).toFixed(3);

  return balanceInFixedString;
}

export async function getOwnedNFTs(account: string, contract: ethers.Contract) {
  const tokenMetadataList: Array<MintedNFT> = [];

  const tokenBalance = await contract.balanceOf(account);
  for (let i = 0; i < tokenBalance; i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(account, i);
    const tokenMetadata = await contract.tokenURI(tokenId._hex);
    const parsedObject = JSON.parse(tokenMetadata);
    tokenMetadataList.push({
      name: parsedObject.name,
      description: parsedObject.description,
      ipfsLink: parsedObject.image,
    });
  }

  return tokenMetadataList;
}

export async function getChainId(): Promise<number> {
  const chainId = await provider.send("eth_chainId", []);
  return parseInt(chainId);
}

export type ChainInfo = {
  chainId: number;
  chainName: string;
  isTestnet: boolean;
  currency: string;
};

export const notConnectedChainInfo: ChainInfo = {
  chainId: 0,
  chainName: "Not connected",
  isTestnet: false,
  currency: "NUL",
};

export const defaultUnknownChainInfo: ChainInfo = {
  chainId: -1,
  chainName: "Unsupported network",
  isTestnet: false,
  currency: "NUL",
};

const chainInfos: Array<ChainInfo> = [
  {
    chainId: 1,
    chainName: "Ethereum",
    isTestnet: false,
    currency: "ETH",
  },
  {
    chainId: 4,
    chainName: "Rinkeby",
    isTestnet: true,
    currency: "ETH",
  },
  {
    chainId: 5,
    chainName: "Goerli",
    isTestnet: true,
    currency: "ETH",
  },
  {
    chainId: 137,
    chainName: "Polygon",
    isTestnet: false,
    currency: "MATIC",
  },
  {
    chainId: 43112,
    chainName: "Avalanche",
    isTestnet: false,
    currency: "AVAX",
  },
  {
    chainId: 43113,
    chainName: "Avalanche Fuji",
    isTestnet: true,
    currency: "AVAX",
  },
];

export async function getChainInfo(): Promise<ChainInfo> {
  const chainId = await getChainId();
  return (
    chainInfos.find((info) => info.chainId === chainId) ??
    defaultUnknownChainInfo
  );
}

export function reloadOnNetworkChange(): void {
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
}
