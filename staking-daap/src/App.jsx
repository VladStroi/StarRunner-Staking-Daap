import "./App.css";

// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider,
// } from "@web3modal/ethereum";
// import { Web3Modal } from "@web3modal/react";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { sepolia, mainnet } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { Footer } from "./components/header-footer/footer/footer";
import { Header } from "./components/header-footer/header/header";
import { MainBar } from "./components/main bar/main-bar";
import { StakeMenu } from "./components/stake manu/stake-menu";

// const chains = [sepolia, mainnet];
// const projectId = "d1ed4a8b1d08ee63e62097023077970f";
// const provaiderApiKey = "b0f4f2bdbc524cf3b57cd014475e319d"

// const { publicClient } = configureChains(chains, [ infuraProvider({ apiKey: provaiderApiKey })]);
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient,
// });
// const ethereumClient = new EthereumClient(wagmiConfig, chains);
const projectId = "d1ed4a8b1d08ee63e62097023077970f";
const provaiderApiKey = "b0f4f2bdbc524cf3b57cd014475e319d";
const { chains, publicClient } = configureChains(
  [sepolia, mainnet],
  [infuraProvider({ apiKey: provaiderApiKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "StarRunner-Staking-Daap",
  chains,
  projectId,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export const App = () => {
  return (
    <>
      {/* <WagmiConfig config={wagmiConfig}> */}
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Header />
          <MainBar />
          <StakeMenu />
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
      {/* </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
};
