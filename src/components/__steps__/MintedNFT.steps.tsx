import React from "react";
import { render } from "@testing-library/react";

import MintedNFT, { Props } from "../MintedNFT";
import BaseSteps from "./Base.steps";

class MintedNFTSteps extends BaseSteps<MintedNFTSteps, Props> {
  public whenIRenderComponent(): MintedNFTSteps {
    render(<MintedNFT {...this.props} />);
    return this;
  }
  public getSteps(): MintedNFTSteps {
    return this;
  }
}

export default MintedNFTSteps;
