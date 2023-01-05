import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../Header";
import BaseSteps from "./Base.steps";
import { AppContext, Context } from "../../context/AppContext";

import { ProviderProps } from "react";

class HeaderSteps extends BaseSteps<HeaderSteps> {
  private providerProps: ProviderProps<Context>;

  public getSteps(): HeaderSteps {
    return this;
  }

  public givenIHaveProviderProps(
    providerProps: ProviderProps<Context>
  ): HeaderSteps {
    this.providerProps = providerProps;
    return this;
  }

  public whenIRenderComponent(): HeaderSteps {
    this.customRender(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { providerProps: this.providerProps }
    );
    return this;
  }

  private customRender(
    ui: React.ReactElement,
    {
      providerProps,
      ...renderOptions
    }: RenderOptions & { providerProps: { value: Context } }
  ) {
    return render(
      <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
      renderOptions
    );
  }
}

export default HeaderSteps;
