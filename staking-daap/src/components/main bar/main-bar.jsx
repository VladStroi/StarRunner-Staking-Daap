import styles from "./main-bar.module.css";

export const MainBar = () => {
  return (
    <section className={styles.mainBar}>
      <section className={styles.stakingInformation}>
        <h2 className={styles.pageName}>StarRunner Token staking</h2>
        <div className={styles.stakingDetails}>
          <div className={styles.stakingData}>
            <div className={styles.balance}>
              <p className={styles.value}>0.00</p>
              <p className={styles.token}>STRU</p>
            </div>
            <p className={styles.name}>Staked balance</p>
          </div>
          <div className={styles.stakingData}>
            <p className={styles.value}>≈8%</p>
            <p className={styles.name}>APR</p>
          </div>
          <div className={styles.stakingData}>
            <p className={styles.value}>0</p>
            <p className={styles.name}>Days</p>
          </div>
          <div className={styles.stakingData}>
            <div className={styles.balance}>
              <p className={styles.value}>0</p>
              <p className={styles.token}>STRU</p>
            </div>
            <p className={styles.name}>Rewards</p>
          </div>
        </div>
        <div className={styles.background}></div>
      </section>
    </section>
  );
};
