import React, { ProviderProps } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

import BaseSteps from "./Base.steps";
import WalletManager from "../WalletManager";
import { AppContext, Context } from "../../context/AppContext";

class WalletManagerSteps extends BaseSteps<WalletManagerSteps> {
  private providerProps: ProviderProps<Context>;

  public givenIHaveProviderProps(
    providerProps: ProviderProps<Context>
  ): WalletManagerSteps {
    this.providerProps = providerProps;
    return this;
  }

  public whenIRenderComponent(): WalletManagerSteps {
    this.customRender(<WalletManager />, { providerProps: this.providerProps });
    return this;
  }

  public getSteps(): WalletManagerSteps {
    return this;
  }

  private customRender(
    ui: React.ReactElement,
    {
      providerProps,
      ...renderOptions
    }: RenderOptions & { providerProps: { value: Context } }
  ): RenderResult {
    return render(
      <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
      renderOptions
    );
  }
}

export default WalletManagerSteps;
