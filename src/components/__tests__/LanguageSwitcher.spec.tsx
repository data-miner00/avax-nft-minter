import LanguageSwitcherSteps from "../__steps__/LanguageSwitcher.steps";

describe("LanguageSwitcher component", () => {
  let steps: LanguageSwitcherSteps;

  beforeEach(() => {
    steps = new LanguageSwitcherSteps();
  });

  it("should renders correctly", () => {
    steps.whenIRenderComponent().thenIExpectElementToExist("language-switcher");
  });

  it("should open popover when button was clicked", () => {
    steps
      .whenIRenderComponent()
      .thenIExpectElementToNotExist("language-switcher-popover")
      .whenIClickOnElement("language-switcher-button")
      .thenIExpectElementToExist("language-switcher-popover");
  });
});
