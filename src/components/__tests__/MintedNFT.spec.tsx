import MintedNFTSteps from "../__steps__/MintedNFT.steps";
import { Props } from "../MintedNFT";

describe("MintedNFT component", () => {
  it("should renders the content properly", () => {
    const steps = new MintedNFTSteps();
    const props: Props = {
      ipfsLink: "ipfsLink",
      name: "name",
      description: "description",
    };
    steps
      .givenIHaveTheFollowingProps(props)
      .whenIRenderComponent()
      .thenIExpectElementToExist("minted")
      .thenIExpectElementToExist("minted-img")
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-img",
        "src",
        `https://gateway.pinata.cloud/ipfs/${props.ipfsLink}`
      )
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-img",
        "alt",
        props.name
      )
      .thenIExpectElementToExist("minted-name")
      .thenIExpectElementToHaveText("minted-name", props.name)
      .thenIExpectElementToExist("minted-description")
      .thenIExpectElementToHaveText("minted-description", props.description)
      .thenIExpectElementToExist("minted-view-img")
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-view-img",
        "href",
        `https://gateway.pinata.cloud/ipfs/${props.ipfsLink}`
      );
  });
});
