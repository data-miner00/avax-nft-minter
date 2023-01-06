import React from "react";
import { render } from "@testing-library/react";

import ThemeSwitcher from "../ThemeSwitcher";
import BaseSteps from "./Base.steps";

class ThemeSwitcherSteps extends BaseSteps<ThemeSwitcherSteps> {
  public whenIRenderComponent(): ThemeSwitcherSteps {
    render(<ThemeSwitcher />);
    return this;
  }
  public getSteps(): ThemeSwitcherSteps {
    return this;
  }
}

export default ThemeSwitcherSteps;
