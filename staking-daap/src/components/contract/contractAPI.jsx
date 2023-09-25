import { contractAddress } from "./contractADDRESS";
import contractAbi from "./contractABI.json";

import { useContractRead, useContractWrite } from "wagmi";

//CONTRACT READ
export const smartContractRead = (functionName, args) => {
  const contractRead = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName,
    args,
  });
  return contractRead;
};

//CONTRACT WRITE
export const smartContractWrite = () => {
  const contractWrite = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
  });
  return contractWrite;
};