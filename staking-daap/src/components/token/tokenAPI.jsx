import { tokenAddress } from "./tokenADDRESS";
import tokenAbi from "./tokenABI.json";

import { useAccount, useContractRead } from "wagmi";

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
