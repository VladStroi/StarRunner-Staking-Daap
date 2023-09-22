import { tokenAddress } from "./tokenADDRESS";
import { contractAddress } from "../contract/contractADDRESS";
import tokenAbi from "./tokenABI.json";

import { useAccount, useContractRead, useContractWrite } from "wagmi";

//CONTRACT READ

//Token Balance
export const useTokenBalance = () => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [address],
  });
  return { data };
};
//

//CONTRACT WRITE

//Approve token
export const useApprove = () => {
  const { writeAsync } = useContractWrite({
    address: tokenAddress,
    abi: tokenAbi,
  });
  return { writeAsync };
};
//