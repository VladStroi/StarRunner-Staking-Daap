import styles from "./not-connect.module.css";
import { CircleError } from "./circle-error";
import { WalletIcon } from "./wallet-icon";

import { useWeb3Modal } from "@web3modal/react";

import { sepolia, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const NotConnect = () => {
  const { connect } = useConnect({
    connector:
      // new MetaMaskConnector({ chains: [sepolia] }),
      // new CoinbaseWalletConnector({
      //           chain: sepolia,

      //   options: {
      //     appName: "wagmi",
      //   },
      // }),
      // new WalletConnectConnector({
      //   options: {
      //     projectId: "d1ed4a8b1d08ee63e62097023077970f",
      //   },
      // }),
    new InjectedConnector({
      chain: sepolia,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  });

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.icon}>
        <WalletIcon />
        <CircleError />
      </div>
      <span>To start staking you need to connect you wallet first</span>
      <ConnectButton />
      {/* <button onClick={() => connect()}>Connect Wallet</button> */}
    </section>
  );
};
