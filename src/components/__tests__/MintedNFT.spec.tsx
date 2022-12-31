import MintedNFTSteps from "../__steps__/MintedNFT.steps";
import { Props } from "../MintedNFT";

describe("MintedNFT component", () => {
  it("should renders the content properly", () => {
    const steps = new MintedNFTSteps();
    const props: Props = {
      tokenId: "tokenId",
      transactionId: "transactionId",
      ipfsLink: "ipfsLink",
      name: "name",
      description: "description",
    };

    steps
      .givenIHaveTheFollowingProps(props)
      .whenIRenderComponent()
      .thenIExpectElementToExist("minted-img")
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-img",
        "src",
        `https://gateway.pinata.cloud/ipfs/${props.ipfsLink}`
      )
      .thenIExpectElementToExist("minted-name")
      .thenIExpectElementToHaveText("minted-name", props.name)
      .thenIExpectElementToExist("minted-tokenId")
      .thenIExpectElementToHaveText("minted-tokenId", `#${props.tokenId}`)
      .thenIExpectElementToExist("minted-description")
      .thenIExpectElementToHaveText("minted-description", props.description)
      .thenIExpectElementToExist("minted-view-tx")
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-view-tx",
        "href",
        `https://testnet.snowtrace.io/tx/${props.transactionId}`
      )
      .thenIExpectElementToHaveText("minted-view-tx", "View on Snowtrace")
      .thenIExpectElementToExist("minted-view-img")
      .thenIExpectElementToHaveAttributeWithValue(
        "minted-view-img",
        "href",
        `https://gateway.pinata.cloud/ipfs/${props.ipfsLink}`
      )
      .thenIExpectElementToHaveText("minted-view-img", "View on IPFS");
  });
});
