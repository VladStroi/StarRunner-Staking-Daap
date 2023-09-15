import { contractAddress } from "./../contract/contractADDRESS";
import contractAbi from "./../contract/contractABI.json";

import { useAccount, useContractRead } from "wagmi";


// Staked Balance
export const useStakingBalance = () => {
    const { address } = useAccount();

      const {
          data,
        } = useContractRead({
            address: contractAddress,
            abi: contractAbi,
            functionName: "balanceOf",
            args: [address],
        });
        return { data };
    }
  //