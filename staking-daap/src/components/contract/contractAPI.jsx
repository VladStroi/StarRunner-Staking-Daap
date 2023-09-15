import contractAbi from "./contractABI.json";
import { contractAddress } from "./contractADDRESS";

const {
  data: dataTotalSupply,
  isError: isErrorTotalSupply,
  isLoading: isLoadingTotalSupply,
} = useContractRead({
  address: contractAddress,
  abi: contractAbi,
  functionName: "totalSupply",
});

const {
  data: dataGetRewardForDuration,
  isError: isErrorGetRewardForDuration,
  isLoading: isLoadingGetRewardForDuration,
} = useContractRead({
  address: contractAddress,
  abi,
  functionName: "getRewardForDuration",
});

const {
  data: dataBalanceOf,
  isError: isErrorBalanceOf,
  isLoading: isLoadingBalanceOf,
} = useContractRead({
  address: contractAddress,
  abi,
  functionName: "balanceOf",
});
