import { tokenAddress } from "./tokenADDRESS";
import tokenAbi from "./tokenABI.json";

import { useContractRead, useContractWrite } from "wagmi";

//CONTRACT READ
export const tokenContractRead = (functionName, args) => {
  const contractRead = useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName,
    args,
  });
  return contractRead;
};

//CONTRACT WRITE
export const tokenContractWrite = () => {
  const tokenContractWrite = useContractWrite({
    address: tokenAddress,
    abi: tokenAbi,
  });
  return tokenContractWrite;
};