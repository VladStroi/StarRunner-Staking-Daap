import React from "react";
import styles from "./header.module.css";

import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { tokenContractRead } from "../../token/tokenAPI";
import { LogoDexola } from "./logo-dexola";

export const Header = () => {
  
  const { address, isConnected } = useAccount();
  const { data: mainTokenBalance } = useBalance({
    address: address,
  });
  const dataTokenBalance = tokenContractRead("balanceOf", [address]);

  const tokenBalance = isConnected
    ? Number(dataTokenBalance.data) / 10 ** 18
    : "not connect wallet";

  if (isConnected)
    return (
      <>
        <header className={styles.header}>
          <div>
            <a href="https://dexola.com/" target="_blank">
              <LogoDexola />
            </a>
          </div>
          <div className={styles.balanceWallet}>
            <div className={styles.struToken}>
              <div className={styles.logo}></div>
              <span>{tokenBalance.toFixed(2)} STRU</span>
            </div>
            <div className={styles.dataWallet}>
              <div className={styles.logo}></div>
              <span>
                {Number(mainTokenBalance?.formatted).toFixed(2)} {mainTokenBalance?.symbol}
              </span>
              <span className={styles.hiddenMobile}>|</span>
              <span className={styles.hiddenMobile}>
                {address.substring(0, 16)}...
              </span>
            </div>
          </div>
        </header>
      </>
    );

  return (
    <>
      <header className={styles.header}>
        <div>
          <a href="https://dexola.com/" target="_blank">
            <LogoDexola />
          </a>
        </div>
        <div>
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
        </div>
      </header>
    </>
  );
};
