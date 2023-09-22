import { contractAddress } from "./contractADDRESS";
import contractAbi from "./contractABI.json";

import { useAccount, useContractRead, useContractWrite } from "wagmi";

//CONTRACT READ

// Staked Balance
export const useStakingBalance = () => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
  });
  return { data };
};
//

// APR
export const useTotalSupply = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "totalSupply",
  });
  return { data };
};

export const useGetRewardForDuration = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getRewardForDuration",
  });
  return { data };
};
//

// Days
export const usePeriodFinish = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "periodFinish",
  });
  return { data };
};
//

// Rewards
export const useRewards = () => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "earned",
    args: [address],
  });
  return { data };
};
//

// Rewards rate
export const useRewardRate = () => {
  const { data } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "rewardRate",
  });
  return { data };
};
//

//CONTRACT WRITE


// Claim reward
export const useClaimReward = () => {
  const { write } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "claimReward",
  });
  return { write };
};
//

// Withdraw
export const useWithdraw = (amount) => {
  const { data, write } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "withdraw",
    args: [amount],
  });
  return { data, write };
};
//

// Stake
export const useStake = (amount) => {
  const { write } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "stake",
    args: [amount],
  });
  return { write };
};