import React from "react";
import { render, screen } from "@testing-library/react";

import MintedNFT, { Props } from "../MintedNFT";

class MintedNFTSteps {
  private props: Props;

  public givenIHaveTheFollowingProps(props: Props): MintedNFTSteps {
    this.props = props;
    return this;
  }

  public whenIRenderComponent(): MintedNFTSteps {
    render(<MintedNFT {...this.props} />);
    return this;
  }

  public thenIExpectElementToExist(testid: string): MintedNFTSteps {
    const element = screen.getByTestId(testid);
    expect(element).toBeInTheDocument();
    return this;
  }

  public thenIExpectElementToHaveText(
    testid: string,
    text: string
  ): MintedNFTSteps {
    const element = screen.getByTestId(testid);
    expect(element).toHaveTextContent(text);
    return this;
  }

  public thenIExpectElementToHaveAttributeWithValue(
    testid: string,
    attribute: string,
    value?: any
  ): MintedNFTSteps {
    const element = screen.getByTestId(testid);
    if (!value) {
      expect(element).toHaveAttribute(attribute);
    } else {
      expect(element).toHaveAttribute(attribute, value);
    }
    return this;
  }
}

export default MintedNFTSteps;
