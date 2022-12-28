export enum Variable {
  REACT_APP_PINATA_API_KEY = "REACT_APP_PINATA_API_KEY",
  REACT_APP_PINATA_API_SECRET = "REACT_APP_PINATA_API_SECRET",
  REACT_APP_CCHAIN_CONTRACT_ADDRESS = "REACT_APP_CCHAIN_CONTRACT_ADDRESS",
}

export function getVariable<T = string>(variable: Variable): T {
  return process.env[variable] as T;
}
