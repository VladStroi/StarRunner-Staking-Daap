import { contractAddress } from "./../contract/contractADDRESS";
import contractAbi from "./../contract/contractABI.json";

import { useContractRead } from "wagmi";

// APR
export const useTotalSupply = () => {
  const {
    data,
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "totalSupply",
  });
  return { data };
};

export const useGetRewardForDuration = () => {
  const {
    data,
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getRewardForDuration",
  });
  return { data };
};
//
