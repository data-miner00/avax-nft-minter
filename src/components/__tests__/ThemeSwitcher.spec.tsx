import React from "react";
import { render } from "@testing-library/react";

import ThemeSwitcher from "../ThemeSwitcher";

describe("ThemeSwitcher component", () => {
  it("should renders correctly", () => {
    render(<ThemeSwitcher />);
  });
});
