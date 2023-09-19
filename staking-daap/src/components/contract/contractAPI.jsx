import { contractAddress } from "./contractADDRESS";
import contractAbi from "./contractABI.json";

import { useAccount, useContractRead } from "wagmi";

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

//Days
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
