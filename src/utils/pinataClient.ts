import axios from "axios";

class PinataClient {
  private readonly pinataUrl: string =
    "https://api.pinata.cloud/pinning/pinFileToIPFS";
  private readonly apiKey: string;
  private readonly apiSecret: string;

  public constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  public async uploadImage(fileLocation: string, filename: string) {
    const response = await axios.get(fileLocation, {
      responseType: "blob",
    });

    return await this.uploadToPinata(response.data, filename);
  }

  private async uploadToPinata(image: any, name: string) {
    const formData = new FormData();
    formData.append("file", image, name);

    const response = await axios.post(this.pinataUrl, formData, {
      maxContentLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data;boundary=${
          (formData as any)._boundary
        }`,
        pinata_api_key: this.apiKey,
        pinata_secret_api_key: this.apiSecret,
      },
    });
    return { imageHash: response.data.IpfsHash };
  }
}

export default PinataClient;
