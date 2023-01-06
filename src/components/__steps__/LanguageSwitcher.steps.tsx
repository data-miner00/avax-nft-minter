import React from "react";
import { render } from "@testing-library/react";

import LanguageSwitcher from "../LanguageSwitcher";
import BaseSteps from "./Base.steps";

class LanguageSwitcherSteps extends BaseSteps<LanguageSwitcherSteps> {
  public whenIRenderComponent(): LanguageSwitcherSteps {
    render(<LanguageSwitcher />);
    return this;
  }

  public getSteps(): LanguageSwitcherSteps {
    return this;
  }
}

export default LanguageSwitcherSteps;
