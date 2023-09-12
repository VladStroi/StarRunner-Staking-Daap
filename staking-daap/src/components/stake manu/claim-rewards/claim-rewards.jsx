import styles from "./claim-rewards.module.css";

export const ClaimRewards = () => {
  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Claim rewards</h1>
      </div>
      <div className={styles.stakeSetting}>
        <div className={styles.available}>
          <span>Available:</span>
          <h2 className={styles.amount}>354</h2>
          <h3>STRU</h3>
        </div>
      </div>
      <button>claim rewards</button>
    </section>
  );
};
