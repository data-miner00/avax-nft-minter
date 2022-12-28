declare module "*.jpg";
declare module "*.svg";
declare module "*.png";

declare module "@metamask/jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement;
}
