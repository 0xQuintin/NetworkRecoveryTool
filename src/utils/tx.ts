//This will be the file for sending transacitons for different assets

import { sign } from "crypto";
import { ethers, utils } from "ethers";
import { ledgerAddress, idInput, provider, dp } from "../App";
import { maxBase, maxPriority } from "./gasPrice";

export const sendBase =  async (_toAddress: string, _amount: string, _signer: any) => {

    let tx = {
        type: 2,
        from: ledgerAddress,
        to: _toAddress,
        value: _amount,
        maxFeePerGas: await maxBase(),
        maxPriorityFeePerGas: await maxPriority(),
        gasLimit: 21000,
        chainId: idInput,
        data: "0x",
        nonce: await provider.getTransactionCount(ledgerAddress)
    }

    const unsignedTx = utils.serializeTransaction(tx).substring(2);
    const signedTx = await _signer.signTransaction(dp, unsignedTx, null);
    signedTx.r = "0x"+signedTx.r;
    signedTx.s = "0x"+signedTx.s;
    signedTx.v = parseInt(signedTx.v);
    const readyTx = utils.serializeTransaction(tx, signedTx);
    await provider.sendTransaction(readyTx).then(data => {
        console.log("Transaction Hash: " + data.hash)
    });
    
}

export default sendBase;