import React from "react";
import { render } from "@testing-library/react";

import LanguageSwitcher from "../LanguageSwitcher";

describe("LanguageSwitcher component", () => {
  it("should renders correctly", () => {
    render(<LanguageSwitcher />);
  });
});
