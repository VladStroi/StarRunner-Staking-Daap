import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const projectId = "d1ed4a8b1d08ee63e62097023077970f";
const provaiderApiKey = "b0f4f2bdbc524cf3b57cd014475e319d";

const { chains, publicClient } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: provaiderApiKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "StarRunner-Staking-Daap",
  chains,
  projectId,
});

export { chains };
export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
