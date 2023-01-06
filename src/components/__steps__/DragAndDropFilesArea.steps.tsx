import React from "react";
import { render } from "@testing-library/react";

import DragAndDropFilesArea, { Props } from "../DragAndDropFilesArea";
import BaseSteps from "./Base.steps";

class DragAndDropFilesAreaSteps extends BaseSteps<
  DragAndDropFilesAreaSteps,
  Props
> {
  public whenIRenderComponent(): DragAndDropFilesAreaSteps {
    render(<DragAndDropFilesArea {...this.props} />);
    return this;
  }

  public getSteps(): DragAndDropFilesAreaSteps {
    return this;
  }
}

export default DragAndDropFilesAreaSteps;
