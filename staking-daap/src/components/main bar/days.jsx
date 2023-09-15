import { contractAddress } from "../contract/contractADDRESS";
import contractAbi from "../contract/contractABI.json";

import { useContractRead } from "wagmi";

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
