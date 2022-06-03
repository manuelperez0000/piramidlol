import React, { useEffect, useState } from "react"
import Web3 from 'web3'
import startApp from '../services/start'
import binanceContract from '../contracts/binanceContract'
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(binanceContract.abi, binanceContract.address)
function App() {

  const [bnb, setBnb] = useState(false)
  const [wallet, setWallet] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    start()
  }, [wallet])

  const start = () => {
    getWallet()
  }

  const getWallet = async () => {
    setLoading(true)
    const _wallet = await startApp.getWallet()
    setWallet(_wallet)
    getBnb(_wallet)
    getContract()
    setLoading(false)
  }

  const getContract = () => {
    console.log(contract.methods)
  }

  const getBnb = async (wallet) => {
    const _bnb = await web3.eth.getBalance(wallet)
    setBnb(_bnb)
  }

  const deposit = async (wallet) => {
    contract.methods.depsit().send({ value: "20000000000000000", from: wallet }).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }

  return (
    <div className="container-fluid bg-dark text-center">
      <div className="row">
        <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
          <div>
            <h1 className="text-white">Disponible!</h1>
            <button className="btn btn-success border"> 2 MATIC</button>
          </div>
        </div>
        <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
          <div>
            <h1 className="text-white">No disponible!</h1>
            <button className="btn btn-danger border"> 4 MATIC</button>
          </div>
        </div>
        <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
          <div>
            <h1 className="text-white">No disponible!</h1>
            <button className="btn btn-danger border"> 8 MATIC</button>
          </div>
        </div>
      </div>
      {/* 
      wallet: {wallet}
      <div>
        BNB: {bnb && web3.utils.fromWei(bnb, "ether")}
      </div>
      <div>
        contract address:
        {binanceContract.address}
      </div>
      <div>
        {!loading && wallet && <button onClick={()=>deposit(wallet)}> Stake 2 MATIC</button>}
      </div> */}
    </div>
  )
}
export default App;
