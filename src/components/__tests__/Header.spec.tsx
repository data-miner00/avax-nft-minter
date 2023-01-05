import { ProviderProps } from "react";
import { Context } from "../../context/AppContext";
import HeaderSteps from "../__steps__/Header.steps";

describe("Header component", () => {
  let steps: HeaderSteps;
  const headerTestId = "header";
  const logoTestId = "header-logo";

  beforeEach(() => {
    steps = new HeaderSteps();
  });

  it("should renders the content properly", () => {
    const providerProps: ProviderProps<Context> = {
      value: {
        account: "0xdd68c326f054bbe66b0AB5541532C686D1418b0D",
        balance: "2.000",
        chainInfo: { chainId: 41333 },
      } as Context,
    };

    steps
      .givenIHaveProviderProps(providerProps)
      .whenIRenderComponent()
      .thenIExpectElementToExist(headerTestId)
      .thenIExpectElementToHaveText(logoTestId, "Aiotter");
  });
});
