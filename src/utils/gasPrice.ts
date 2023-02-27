import { BigNumber } from "ethers";
import { provider } from "../App";

let maxFeePerGas: any;
let maxPriorityFeePerGas: any;


export const maxBase = async () => {

    await provider.getFeeData().then(data => {
        maxFeePerGas = data.maxFeePerGas;
    });

    return maxFeePerGas;

}

export const maxPriority = async () => {

    await provider.getFeeData().then(data => {
        maxPriorityFeePerGas = data.maxPriorityFeePerGas;
    });

    return maxPriorityFeePerGas;

}

export default maxBase;