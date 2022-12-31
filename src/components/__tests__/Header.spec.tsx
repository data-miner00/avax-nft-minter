import React from "react";
import { render, screen, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../Header";
import { AppContext } from "../../context/AppContext";

function customRender(
  ui: React.ReactElement,
  {
    providerProps,
    ...renderOptions
  }: RenderOptions & { providerProps: { value: { [name: string]: any } } }
) {
  return render(
    <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  );
}

describe("Header component", () => {
  it("should renders the content properly", () => {
    const providerProps = {
      value: {
        account: "0xdd68c326f054bbe66b0AB5541532C686D1418b0D",
        balance: "2.000",
      },
    };

    customRender(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { providerProps }
    );
    const logoElement = screen.getByText(/aiotter/i);
    const amountElement = screen.getByText("2.000 AVAX");
    const addressElement = screen.getByText("0xdd68...8b0D");
    expect(logoElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
  });
});
