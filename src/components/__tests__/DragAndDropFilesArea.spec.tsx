import { Props } from "../DragAndDropFilesArea";
import DragAndDropFilesAreaSteps from "../__steps__/DragAndDropFilesArea.steps";

describe("Drag and drop files area component", () => {
  let steps: DragAndDropFilesAreaSteps;

  beforeEach(() => (steps = new DragAndDropFilesAreaSteps()));

  it("should render properly", () => {
    const props: Props = {
      onChange: jest.fn(),
      onDrop: jest.fn(),
    };

    steps
      .givenIHaveTheFollowingProps(props)
      .whenIRenderComponent()
      .thenIExpectElementToExist("drag-drop-area")
      .thenIExpectElementToExist("drag-drop-hidden-input");
  });
});
