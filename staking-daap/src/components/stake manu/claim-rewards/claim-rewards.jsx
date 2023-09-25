import styles from "./claim-rewards.module.css";
import { useAccount } from "wagmi";

import {
  smartContractRead,
  smartContractWrite,
} from "../../contract/contractAPI";

export const ClaimRewards = () => {
  const { address } = useAccount();

  // Rewards
  const earned = smartContractRead("earned", [address]);
  const rewards = (Number(earned.data) / 10 ** 18).toFixed(2);
  //

  //Claim rewards
  const claimRewards = smartContractWrite();
  //

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Claim rewards</h1>
      </div>
      <div className={styles.stakeSetting}>
        <div className={styles.available}>
          <span>Available:</span>
          <h2 className={styles.amount}>{rewards}</h2>
          <h3>STRU</h3>
        </div>
      </div>
      <button
        onClick={() => claimRewards.write({ functionName: "claimReward" })}
      >
        claim rewards
      </button>
    </section>
  );
};
