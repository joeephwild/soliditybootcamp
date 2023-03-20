import { useState } from "react";
import { ethers } from "ethers";
import data from './data.json'
 
function App() {
  let [text, setText] = useState("");
  let [savedText, setSavedText] = useState("");
  let [address, setAddress] = useState("");
  let [connected, setConnected] = useState(false);
 
  let { ethereum } = window;
  let contract = null;
 
  if (ethereum) {
 
    let abi = [
      "function mint(address to)"
    ]
    let address = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }
 
  return (
    <div className="App">
      <h1>Text Contract</h1>
 
      <button onClick={() => {
          if (contract && !connected) {
              ethereum.request({ method: 'eth_requestAccounts'})
                  .then(accounts => {
                      setConnected(true);
                  })
          }
      }}>{!connected ? 'Connect wallet' : 'Connected' }</button>
 
      <form onSubmit={(e) => {
        e.preventDefault();
          contract.mint(
          address
          )
           
      }}>
          <input type="text" placeholder="Enter address" onChange={e => setAddress(e.currentTarget.value)} value={address} />
          <input type="submit" value="Change text" />
      </form>
 
      <button onClick={() => {
        if (contract && connected) {
          contract.text()
            .then(text => {
              setSavedText(text);
            })
        }
      }}>Get text</button>
 
      <h3>{savedText}</h3>
    </div>
  );
}
 
export default App;
