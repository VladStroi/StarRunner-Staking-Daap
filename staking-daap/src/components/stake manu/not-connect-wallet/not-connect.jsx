import styles from "./not-connect.module.css";
import { CircleError } from "./circle-error";
import { WalletIcon } from "./wallet-icon";

import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const NotConnect = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.icon}>
        <WalletIcon />
        <CircleError />
      </div>
      <span>To start staking you need to connect you wallet first</span>
          <button onClick={() => connect()}>Connect Wallet</button>
    </section>
  );
};
