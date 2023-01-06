import ThemeSwitcherSteps from "../__steps__/ThemeSwitcher.steps";

describe("ThemeSwitcher component", () => {
  let steps: ThemeSwitcherSteps;

  beforeEach(() => {
    steps = new ThemeSwitcherSteps();
  });

  it("should renders correctly", () => {
    steps.whenIRenderComponent().thenIExpectElementToExist("theme-switcher");
  });
});
