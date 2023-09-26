import styles from "./not-connect.module.css";
import { CircleError } from "./circle-error";
import { WalletIcon } from "./wallet-icon";

import {  useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const NotConnect = () => {
  const { isConnected } = useAccount();

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.icon}>
        <WalletIcon />
        <CircleError />
      </div>
      <span>To start staking you need to connect you wallet first</span>
      <ConnectButton.Custom>
      {({ openConnectModal, connectModalOpen }) => {
        return (
          <button
            disabled={isConnected && connectModalOpen}
            onClick={openConnectModal}
          >
            Connect Wallet
          </button>
        );
      }}
    </ConnectButton.Custom>
    </section>
  );
};
