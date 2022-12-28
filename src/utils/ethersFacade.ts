import ethers = require("ethers");
import abi from "../abis/abi.json";

export async function connectToWallet(): Promise<ethers.providers.JsonRpcSigner> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
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
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(account);
  const balanceInFixedString = parseFloat(
    ethers.utils.formatEther(balance)
  ).toFixed(3);

  return balanceInFixedString;
}
