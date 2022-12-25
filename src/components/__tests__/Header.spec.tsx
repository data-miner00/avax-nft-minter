import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../Header";

describe("Header component", () => {
  it("should renders the content properly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const helloElement = screen.getByText(/home/i);
    expect(helloElement).toBeInTheDocument();
  });
});
