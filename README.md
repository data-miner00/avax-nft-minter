<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="/">
    <img width="200px" src="public/favicon.svg" />
  </a>

  <h3 align="center">AiotterFI - NFT Minter</h3>

  <p align="center">
    A custom ERC721 NFT minter on Avalanche Fuji with token ARTZ!
    <br />
    <a href="https://github.com/data-miner00/avax-nft-minter"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/data-miner00/avax-nft-minter">View Demo</a>
    ·
    <a href="https://github.com/data-miner00/avax-nft-minter/issues">Report Bug</a>
    ·
    <a href="https://github.com/data-miner00/avax-nft-minter/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#design">Design</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Project screenshot](/public/assets/screenshot.png)

A mini NFT Minter that allows user to upload any images to be minted. The minted NFTs will fall under the token named Arts with symbol ARTZ.

Incentives:

- Wanted to try out Avalanche C-Chain
- Wanted to prepare for a NFT marketplace

This is a very rough version of the project and is far from complete. Iterations of enhancement will be carried out as time goes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The technologies and tools used within this project.

- React
- Esbuild
- ESLint
- TypeScript
- Jest/Testing Library
- TailwindCSS
- Framer Motion
- GitHub Workflow
- Ethers.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DESIGN -->

### Design

Charts are very useful to let people know the high level designs of the project. Usually people will use some of more sophisticated third-party diagramming tools such as Enterprese Architect or a light-weighted [draw.io](https://app.diagrams.net).

Contrary to the public's awareness, GitHub actually supports diagramming language [Mermaid](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams#creating-mermaid-diagrams) that can generate a wide array of diagrams such as flowchart, sequence diagram, class diagram and more!

```mermaid
graph TD;
    Hardhat -- Contract --> cchain[Avalanche C-Chain];
    Metamask -- query contract --> cchain;
    cchain -- contract instance --> Metamask;
    React --> Metamask;
    Metamask --> React;
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

The list of tools that is used when development.

- npm
  ```sh
  npm install npm@latest -g
  ```
- Pnpm
  ```sh
  npm i -g pnpm
  ```
- [Git](https://git-scm.com/downloads)

### Installation

_To use this template for personal use or contribution, simply perform the following._ A total of **3 terminals** are required to get 3 of the core components of application up and running for development. However, it is possible to start all the necessary processes with one terminal by using `pnpm dev` as shown on step 7.

1. Clone the repo
   ```sh
   git clone https://github.com/data-miner00/avax-nft-minter.git
   ```
2. Install Node dependencies
   ```sh
   pnpm i
   ```
3. Optionally update the dependencies
   ```sh
   pnpm up --latest
   ```
4. Recommend to run tests to check if things are breaking
   ```sh
   pnpm test
   ```
5. Optionally run lint to check if code styles are breaking
   ```sh
   pnpm lint
   ```
6. Run formatter to format code
   ```sh
   pnpm format
   ```
7. Start Esbuild, Tailwind JIT and local dev server concurrently. Skip 8,9,10
   ```sh
   pnpm dev
   ```
8. Start Esbuild (requires 1 terminal)
   ```sh
   pnpm watch
   ```
9. Start Tailwind JIT (requires 1 terminal)
   ```sh
   pnpm watch:tw
   ```
10. Finally start local dev server (requires 1 terminal)
    ```sh
    pnpm start
    ```
11. Compile for production
    ```sh
    pnpm build:tw
    pnpm build
    ```
12. Purge dist folder
    ```sh
    pnpm purge
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] First implementation
- [ ] Fix dark mode
- [ ] Enhance design and stylings
- [ ] Add translations
  - [ ] Korean
  - [ ] Japanese

See the [open issues](https://github.com/data-miner00/avax-nft-minter/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

List of resources that are helpful and would like to give credit to.

- [Why You Should Use ESBuild OVER Webpack for React Projects](https://www.youtube.com/watch?v=VmgRBwMIRBE)
- [esbuild homepage](https://esbuild.github.io/)
- [SyntaxError: Support for the experimental syntax jsx isn’t currently enabled](https://akashmittal.com/code-example-syntaxerror-support-for-the-experimental-syntax-jsx-isnt-currently-enabled/)
- [Robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [useHooks](https://usehooks.com/)
- [Configuring Public Path](https://esbuild.github.io/api/#public-path)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)
- [Issue Template](https://github.com/Josee9988/project-template)
- [[Feature] read substitution variables from .env file](https://github.com/evanw/esbuild/issues/69#issuecomment-1324478979)
- [ESLint Typescript](https://typescript-eslint.io/)
- [GitHub Actions](https://github.com/marketplace?type=actions)
- [Pnpm CI](https://pnpm.io/continuous-integration)
- [global is not defined](https://github.com/WalletConnect/walletconnect-monorepo/issues/1144)
- [Connect Metamask](https://github.com/jacobedawson/connect-metamask-react-dapp/blob/main/README.md)
- [Cannot set property of #<Object> which has only a getter](https://github.com/evanw/esbuild/issues/587)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/data-miner00/avax-nft-minter.svg?style=for-the-badge
[contributors-url]: https://github.com/data-miner00/avax-nft-minter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/data-miner00/avax-nft-minter.svg?style=for-the-badge
[forks-url]: https://github.com/data-miner00/avax-nft-minter/network/members
[stars-shield]: https://img.shields.io/github/stars/data-miner00/avax-nft-minter.svg?style=for-the-badge
[stars-url]: https://github.com/data-miner00/avax-nft-minter/stargazers
[issues-shield]: https://img.shields.io/github/issues/data-miner00/avax-nft-minter.svg?style=for-the-badge
[issues-url]: https://github.com/data-miner00/avax-nft-minter/issues
[license-shield]: https://img.shields.io/github/license/data-miner00/avax-nft-minter.svg?style=for-the-badge
[license-url]: https://github.com/data-miner00/avax-nft-minter/blob/master/LICENSE.txt
