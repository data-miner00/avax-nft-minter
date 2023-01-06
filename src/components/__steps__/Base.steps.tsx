import { screen, fireEvent } from "@testing-library/react";

abstract class BaseSteps<TStep, TProps = {}> {
  protected props: TProps;

  public givenIHaveTheFollowingProps(props: TProps): TStep {
    this.props = props;
    return this.getSteps();
  }

  public abstract whenIRenderComponent(): TStep;

  public whenIClickOnElement(testid: string): TStep {
    fireEvent(
      screen.getByTestId(testid),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    return this.getSteps();
  }

  public thenIExpectElementToExist(testid: string): TStep {
    const element = screen.getByTestId(testid);
    expect(element).toBeInTheDocument();
    return this.getSteps();
  }

  public thenIExpectElementToNotExist(testid: string): TStep {
    const element = screen.queryByTestId(testid);
    expect(element).not.toBeInTheDocument();
    return this.getSteps();
  }

  public thenIExpectElementToHaveText(testid: string, text: string): TStep {
    const element = screen.getByTestId(testid);
    expect(element).toHaveTextContent(text);
    return this.getSteps();
  }

  public thenIExpectElementToHaveAttributeWithValue<T = string>(
    testid: string,
    attribute: string,
    value?: T
  ): TStep {
    const element = screen.getByTestId(testid);
    if (value != null) {
      expect(element).toHaveAttribute(attribute);
    } else {
      expect(element).toHaveAttribute(attribute, value);
    }
    return this.getSteps();
  }

  public abstract getSteps(): TStep;
}

export default BaseSteps;
