import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: "https://eth-holesky.g.alchemy.com/v2/Pfs7JxHtN4JS1qxgkSnUJOdPflyIeXWZ",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      holesky: "R9PDGZ5TIWICWD5HG9KG8FC7A443JYDSWE"
    }
  },
  sourcify: {
    enabled: true
  }
};

export default config;
