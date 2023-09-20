import styles from "./claim-rewards.module.css";
import { useRewards, useClaimReward } from "./../../contract/contractAPI";

export const ClaimRewards = () => {
  // Rewards
  const { data: earned } = useRewards();
  const rewards = (Number(earned) / 10 ** 18).toFixed(2);
  //

  //Claim rewards
  const { write } = useClaimReward();
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
      <button onClick={() => write()}>claim rewards</button>
    </section>
  );
};
