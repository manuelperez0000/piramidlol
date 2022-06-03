import React, { useEffect, useState } from "react"
import Web3 from 'web3'
import startApp from '../services/start'
import binanceContract from '../contracts/binanceContract'
import Loder from "./loader/loader"
import Turno from "./turno/turno"

const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(binanceContract.abi, binanceContract.address)
function App() {

  const [wallet, setWallet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [turno1, setTurno1] = useState(false)
  const [turno2, setTurno2] = useState(false)
  const [turno3, setTurno3] = useState(false)
  const [disponible1, setDisponible1] = useState(true)
  const [disponible2, setDisponible2] = useState(false)
  const [disponible3, setDisponible3] = useState(false)

  useEffect(() => {
    getWallet()
  }, [])

  const getWallet = async () => {
    setLoading(true)
    try {
      const _wallet = await startApp.getWallet()
      setWallet(_wallet)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const deposit = async (wallet, value, nivel) => {
    setLoading(true)
    if (nivel == 1) {
      contract.methods.depsit1().send({ value, from: wallet }).then(res => {
        console.log(res)
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
    if (nivel == 2) {
      contract.methods.depsit2().send({ value, from: wallet }).then(res => {
        console.log(res)
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
    if (nivel == 3) {
      contract.methods.depsit3().send({ value, from: wallet }).then(res => {
        console.log(res)
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <div className="container-fluid bg-dark text-center">
      <div className="wallet">
        {wallet ? wallet : <button onClick={getWallet}> Connect wallet </button>}
      </div>
      <div className="row">

        {disponible1 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">1</h2>
              <h3 className="text-white">Disponible!</h3>
              <h1 className="text-white">X1.7</h1>
              {!loading && wallet ? <button className="btn btn-success border" onClick={() => deposit(wallet, "20000000000000000", 1)}> Stake 2 MATIC</button> : <button className="btn btn-secondary"> Stake 2 MATIC </button>}
            </div>
            <Turno turno={turno1} />
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">1</h2>
              <h3 className="text-white">No disponible!</h3>
              <h1 className="text-white">X1.7</h1>
              {!loading && wallet ? <button className="btn btn-success border"> Stake 2 MATIC</button> : <button className="btn btn-secondary"> Stake 2 MATIC </button>}
            </div>
            <Turno turno={turno1} />
          </div>
        }
        {disponible2 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">2</h2>
              <h3 className="text-white">Completa el nivel 1 para acceder al nivel 2</h3>
              <h1 className="text-white">X1.8</h1>
              <button className="btn btn-danger border" onClick={() => deposit(wallet, "34000000000000000", 2)}>Stake 3.4 MATIC</button>
            </div>
            <Turno turno={turno2} />
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">2</h2>
              <h3 className="text-white">Completa el nivel 1 para acceder al nivel 2</h3>
              <h1 className="text-white">X1.8</h1>
              <button className="btn btn-danger border">Stake 3.4 MATIC</button>
            </div>
            <Turno turno={turno2} />
          </div>
        }
        {disponible3 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">3</h2>
              <h3 className="text-white">Completa el nivel 2 para acceder al nivel 3</h3>
              <h1 className="text-white">X1.9</h1>
              <button className="btn btn-danger border" onClick={() => deposit(wallet, "61200000000000000", 3)}>Stake 6.12 MATIC</button>
            </div>
            <Turno turno={turno3} />
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div>
              <h2 className="nivelNumber">3</h2>
              <h3 className="text-white">Completa el nivel 2 para acceder al nivel 3</h3>
              <h1 className="text-white">X1.9</h1>
              <button className="btn btn-danger border">Stake 6.12 MATIC</button>
            </div>
            <Turno turno={turno3} />
          </div>
        }
      </div>
      {loading && <Loder />}
    </div >
  )
}
export default App;
