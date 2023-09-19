import styles from "./main-bar.module.css";

import { useAccount } from "wagmi";
import {
  useStakingBalance,
  usePeriodFinish,
  useRewards,
  useTotalSupply,
  useGetRewardForDuration,
} from "./../contract/contractAPI";

export const MainBar = () => {
  const { isConnected } = useAccount();

  // Staked Balance
  const { data: stakingBalance } = useStakingBalance();

  const stakedBalance = Number(stakingBalance) / 10 ** 18;
  //

  // APR
  const { data: totalSupply } = useTotalSupply();
  const { data: getRewardForDuration } = useGetRewardForDuration();

  const apr = Math.floor(
    (Number(getRewardForDuration) * 100) / Number(totalSupply)
  );
  //

  //Days
  const { data: periodFinish } = usePeriodFinish();

  const currentTimestamp = Math.floor(Date.now()) / 1000;
  const oneDayDurationInSeconds = 24 * 60 * 60;

  const days = Math.floor(
    (Number(periodFinish) - currentTimestamp) / oneDayDurationInSeconds
  );
  //

  // Rewards
  const { data: earned } = useRewards();
  const rewards = Number(earned) / 10 ** 18;
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
              <p className={styles.value}>
                {isConnected ? rewards.toString().substring(0, 4) : "0"}
              </p>
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
