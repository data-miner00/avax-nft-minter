import { ProviderProps } from "react";
import { Context } from "../../context/AppContext";
import WalletManagerSteps from "../__steps__/WalletManager.steps";
import { notConnectedChainInfo, ChainInfo } from "../../utils/ethersFacade";

describe("Wallet manager component", () => {
  let steps: WalletManagerSteps;
  const walletManagerRootTestId = "wallet";
  const accountDetailsTestId = "wallet-details";
  const connectButtonTestId = "wallet-connect-btn";
  const chainNameTestId = "wallet-chainname";
  const balanceTestId = "wallet-balance";
  const addressTestId = "wallet-address";

  beforeEach(() => (steps = new WalletManagerSteps()));

  it("should render properly", () => {
    const providerProps: ProviderProps<Context> = {
      value: {
        account: "",
        chainInfo: notConnectedChainInfo,
      } as Context,
    };

    steps
      .givenIHaveProviderProps(providerProps)
      .whenIRenderComponent()
      .thenIExpectElementToExist(walletManagerRootTestId);
  });

  it("should render connect button when no account connected", () => {
    const providerProps: ProviderProps<Context> = {
      value: {
        account: "",
        chainInfo: notConnectedChainInfo,
      } as Context,
    };

    steps
      .givenIHaveProviderProps(providerProps)
      .whenIRenderComponent()
      .thenIExpectElementToExist(connectButtonTestId)
      .thenIExpectElementToNotExist(accountDetailsTestId);
  });

  it("should render account details when account is connected", () => {
    const account = "0xdd68c326f054bbe66b0AB5541532C686D1418b0D";
    const balance = "2.000";
    const chainInfo: ChainInfo = {
      chainId: 41333,
      chainName: "Avalanche Fuji",
      currency: "AVAX",
      isTestnet: true,
    };
    const providerProps: ProviderProps<Context> = {
      value: {
        account,
        balance,
        chainInfo,
      } as Context,
    };

    steps
      .givenIHaveProviderProps(providerProps)
      .whenIRenderComponent()
      .thenIExpectElementToExist(accountDetailsTestId)
      .thenIExpectElementToNotExist(connectButtonTestId)
      .thenIExpectElementToHaveText(chainNameTestId, chainInfo.chainName)
      .thenIExpectElementToHaveText(
        balanceTestId,
        balance + " " + chainInfo.currency
      )
      .thenIExpectElementToHaveText(addressTestId, "0xdd68...8b0D");
  });
});
