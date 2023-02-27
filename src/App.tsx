import { SetStateAction, useRef, useState } from 'react';
import './App.css';
import { BigNumberish, ethers } from 'ethers';
import 'core-js/actual';
import { listen } from "@ledgerhq/logs";
import Eth from "@ledgerhq/hw-app-eth";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";

export let [vAddress, setAddress] = useState("not connected yet");
export let [dp, setDp] = useState("44'/60'/0'/0/0");
let [derivationInput, setDi] = useState("44'/60'/0'/0/0");
let [rpcInput, setRpc] = useState("https://api.securerpc.com/v1")
export let [idInput, setId]: any = useState("1");

let networkName = "";
export let ledgerAddress: string;
let recipient;
let value;
let gasLimit;
let gasPrice: any;
let nonce;
let ETH;
export let provider = new ethers.providers.JsonRpcProvider(rpcInput);

function App() {

  //I should make the change handlers better, but this is easier for now. lol
  const dChangeHandler = (e: { target: { value: SetStateAction<string>; }; }) => {
    setDi(e.target.value);
  }
  const rpcChangeHandler = (e: { target: { value: SetStateAction<string>; }; }) => {
    setRpc(e.target.value);
  }
  const idChangeHandler = (e: { target: { value: SetStateAction<string>; }; }) => {
    setId(e.target.value);
  }

  const connectLedger = async () => {

    setDp(dp = derivationInput);

    const transport = await TransportWebHID.create();
    listen(log => console.log(log));
    ETH = new Eth(transport);
    const { address } = await ETH.getAddress(dp, true);

    ledgerAddress = address;
    setAddress(vAddress = ledgerAddress);
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <h1>Network recovery tool</h1>
        <p>Derviation path: {dp}</p>
        <input type="text" value={idInput} onChange={idChangeHandler}/>
        <input type="text" value={rpcInput} onChange={rpcChangeHandler}/>
        <input type="text" value={derivationInput} onChange={dChangeHandler} />
        <button type='button' onClick={connectLedger}>this is a button</button>
        <h2>{vAddress}</h2>
      </div>
    </div>
  );
}


export default App;
