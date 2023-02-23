import { SetStateAction, useRef, useState } from 'react';
import './App.css';
import { BigNumberish, ethers, JsonRpcProvider } from 'ethers';
import 'core-js/actual';
import { listen } from "@ledgerhq/logs";
import Eth from "@ledgerhq/hw-app-eth";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";

function App() {

  let [vAddress, setAddress] = useState("not connected yet");
  let [dp, setDp] = useState("44'/60'/0'/0/0");
  let [derivationInput, setDi] = useState("44'/60'/0'/0/0");
  let [rpcInput, setRpc] = useState("https://api.securerpc.com/v1")
  let [idInput, setId] = useState("1");

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

  let networkName = "";
  let ledgerAddress;
  let recipient;
  let value;
  let gasLimit;
  let gasPrice: any;
  let nonce;
  let ETH;

  let provider = new JsonRpcProvider(rpcInput);

  const connectLedger = async () => {

    setDp(dp = derivationInput);

    const transport = await TransportWebHID.create();
    listen(log => console.log(log));
    ETH = new Eth(transport);
    const { address } = await ETH.getAddress(dp, true);

    ledgerAddress = address;
    setAddress(vAddress = ledgerAddress);
    let getFeeData = provider.getFeeData().then(data => {
      gasPrice = data.gasPrice 
    })
    gasPrice = parseInt(gasPrice,16)*1.15;
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
