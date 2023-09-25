import styles from "./main-bar.module.css";

import { useAccount } from "wagmi";
import { smartContractRead } from "./../contract/contractAPI";

export const MainBar = () => {
  const { isConnected } = useAccount();
  const { address } = useAccount();

  // Staked Balance
  const stakingBalance = smartContractRead("balanceOf", [address]);
  const stakedBalance = (Number(stakingBalance.data) / 10 ** 18).toFixed(2);
  //

  // APR
  const totalSupply = smartContractRead("totalSupply");
  const getRewardForDuration = smartContractRead("getRewardForDuration");
  const apr = Math.floor(
    (Number(getRewardForDuration.data) * 100) / Number(totalSupply.data)
  );
  //

  //Days
  const periodFinish = smartContractRead("periodFinish");
  const currentTimestamp = Math.floor(Date.now()) / 1000;
  const oneDayDurationInSeconds = 24 * 60 * 60;
  const days = Math.floor(
    (Number(periodFinish.data) - currentTimestamp) / oneDayDurationInSeconds
  );
  //

  // Rewards
  const earned = smartContractRead("earned", [address]);
  const rewards = (Number(earned.data) / 10 ** 18).toFixed(2);
  //

  return (
    <section className={styles.mainBar}>
      <section className={styles.stakingInformation}>
        <h2 className={styles.pageName}>StarRunner Token staking</h2>
        <div className={styles.stakingDetails}>
          <div className={styles.stakingData}>
            <div className={styles.balance}>
              <p className={styles.value}>
                {isConnected ? stakedBalance : "0.00"}
              </p>
              <p className={styles.token}>STRU</p>
            </div>
            <p className={styles.name}>Staked balance</p>
          </div>
          <div className={styles.stakingData}>
            <p className={styles.value}>≈{apr}%</p>
            <p className={styles.name}>APR</p>
          </div>
          <div className={styles.stakingData}>
            <p className={styles.value}>{days}</p>
            <p className={styles.name}>Days</p>
          </div>
          <div className={styles.stakingData}>
            <div className={styles.balance}>
              <p className={styles.value}>{isConnected ? rewards : "0"}</p>
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
