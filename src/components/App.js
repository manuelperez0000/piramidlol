import React, { useEffect, useState } from "react"
import Web3 from 'web3'
import startApp from '../services/start'
import binanceContract from '../contracts/binanceContract'
import Loder from "./loader/loader"
import Navbar from "./navbar/navbar"
import Sidebar from "./sidebar/sidebar"
import Routes from "../routes"
import { BrowserRouter } from "react-router-dom"
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(binanceContract.abi, binanceContract.address)
function App() {

  const [wallet, setWallet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(false)

  useEffect(() => {
    comproveChain()
  }, [])

  const resumeWallet = (wallet) => wallet.substr(wallet.length - 6, 6);

  const comproveChain = async () => {
    if (window.ethereum) {
      const chainId = web3.utils.toHex("137")
      const id = await window.ethereum.request({ method: 'eth_chainId' })
      if (id == chainId) {
        getWallet()
      } else {
        window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })
      }
    } else {
      alert("Para usar esta aplicacion debe instalar metamas y configurar la red de polygon")
      setLoading(false)
    }

  }

  const getWallet = async () => {
    setLoading(true)
    try {
      getBalance()
      const _wallet = await startApp.getWallet()
      setWallet(_wallet)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getBalance = async () => {
    contract.methods.balance().call().then(res => {
      setBalance(res)
    }).catch(err => console.log(err))
  }

  return (
    <BrowserRouter >
      <Navbar wallet={wallet} resumeWallet={resumeWallet} comproveChain={comproveChain} />
      <div className="container-fluid mt-60">
        <div className="row p-0">
          <div className="col-12 col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <div className="container-fluid p-0">
              <div className="row">
                <Routes wallet={wallet} />
              </div>
            </div>
          </div>
        </div>
        {loading && <Loder />}
      </div >
    </BrowserRouter>

  )
}
export default App;