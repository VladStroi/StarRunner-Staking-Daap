import styles from "./withdraw.module.css";

export const Withdraw = () => {
  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Withdraw</h1>
        <div className={styles.rate}>
          <span>Reward rate:</span>
          <h2 className={styles.amount}>1</h2>
          <h3>STRU/week</h3>
        </div>
      </div>
      <div className={styles.stakeSetting}>
        <div className={styles.inputBlock}>
          <input className={styles.enteringAmount} placeholder="Enter withdraw amount" type="text" inputMode="numeric" pattern="[0-9]*" />
        </div>
        <div className={styles.available}>
          <span>Available:</span>
          <h2 className={styles.amount}>354</h2>
          <h3>STRU</h3>
        </div>
      </div>
      <div className={styles.buttonGroup}>
      <button>withdraw</button>
      <span>withdraw all & Claim rewards</span>
      </div>
    </section>
  );
};
