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
  const [turno1, setTurno1] = useState(true)
  const [turno2, setTurno2] = useState(true)
  const [turno3, setTurno3] = useState(true)
  const [permisions, setPermisions] = useState(false)
  const [coversId1, setCoversId1] = useState(false)
  const [coversId2, setCoversId2] = useState(false)
  const [coversId3, setCoversId3] = useState(false)
/*   const [id1,setId1] = useState()
  const [id2,setId2] = useState()
  const [id3,setId3] = useState() */

  const prices = [
    "20000000000000000",
    "40000000000000000",
    "80000000000000000"
  ]

  useEffect(() => {
    getWallet()
  }, [])

  const getWallet = async () => {
    
    setLoading(true)
    try {
      const _wallet = await startApp.getWallet()
      setWallet(_wallet)
      const _ids = await getIds(_wallet)
      await getCoversId(_ids)
      await getPermisions(_wallet)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getIds = async (_wallet)=>{
    try {
      const _id1 = await contract.methods.getId1(_wallet).call()
      const _id2 = await contract.methods.getId2(_wallet).call()
      const _id3 = await contract.methods.getId3(_wallet).call()
     /*  setId1(_id1)
      setId2(_id2)
      setId3(_id3) */
      console.log([_id1, _id2, _id3])
      return [_id1, _id2, _id3]
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const getCoversId = async (_ids) => {
    try {
      const c1 = await contract.methods.coversId1().call()
      setCoversId1(c1)
      const c2 = await contract.methods.coversId2().call()
      setCoversId2(c2)
      const c3 = await contract.methods.coversId3().call()
      setCoversId3(c3)

      getStorage(c1, c2, c3,_ids)

    } catch (error) {
      console.error(error)
    }
  }

  const getPermisions = async (_wallet) => {
    try {
      const permis = await contract.methods.permisions(_wallet).call()
      setPermisions(permis)
      return
    } catch (error) {
      console.log(error)
    }
  }

  const deposit = async (wallet, value, nivel) => {
    setLoading(true)
    if (nivel == 1) {
      contract.methods.depsit1().send({ value, from: wallet }).then(res => {
        localStorage.setItem('piramidId1', res.events.deposit.returnValues.id);
        getWallet()
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 2) {
      contract.methods.depsit2().send({ value, from: wallet }).then(res => {
        localStorage.setItem('piramidId2', res.events.deposit.returnValues.id);
        getWallet()
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 3) {
      contract.methods.depsit3().send({ value, from: wallet }).then(res => {
        localStorage.setItem('piramidId3', res.events.deposit.returnValues.id);
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
  }

  const getStorage = (block1, block2, block3,_ids) => {
    if (block1 > _ids[0] + 1 || block1 == _ids[0]){
      setTurno1(false)
    }else{
      setTurno1(true)
    }
    if (block2 > _ids[1] + 2 || block2 == _ids[1]) {
      setTurno2(false)
    }else{
      setTurno2(true)
      
    }
    if (block3 > _ids[2] + 2 || block3 == _ids[2]){
      setTurno3(false)
    }else{
      setTurno3(true)
     
    }
    
  }

  return (
    <div className="container-fluid bg-dark text-center">
      <div className="wallet">
        {wallet ? wallet : <button onClick={getWallet}> Connect wallet </button>}
      </div>
      <div className="row">

        {permisions && permisions >= 0 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">1</h2>
              {coversId1 && <>Blocks: {coversId1}</>}
              <h1 className="text-white">X1.7</h1>
              {!loading && wallet ? <button className="btn btn-success border" onClick={() => deposit(wallet, prices[0], 1)}> Stake 2 MATIC</button> : <button className="btn btn-secondary"> Loading</button>}
              <Turno turno={turno1} />
            </div>
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">1</h2>
              {coversId1 && <>Blocks: {coversId1}</>}
              <h3 className="text-white">No disponible!</h3>
              <h1 className="text-white">X1.7</h1>
              {!loading && wallet ? <button className="btn btn-success border" onClick={() => alert("Espere un momento")}> Stake 2 MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno1} />
            </div>
          </div>
        }
        {permisions && permisions >= 1 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">2</h2>
              {coversId2 && <>Blocks: {coversId2}</>}
              {permisions && permisions < 1 &&
                <h3 className="text-white">Completa el nivel 1 para acceder al nivel 2</h3>}
              <h1 className="text-white">X1.8</h1>
              {!loading && wallet ? <button className="btn btn-danger border" onClick={() => deposit(wallet, prices[1], 2)}>Stake 3.4 MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno2} />
            </div>
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">2</h2>
              {coversId2 && <>Blocks: {coversId2}</>}
              <h3 className="text-white">Completa el nivel 1 para acceder al nivel 2</h3>
              <h1 className="text-white">X1.8</h1>
              {!loading && wallet ? <button className="btn btn-danger border" onClick={() => alert("Debe completar el nivel 1 primero")}>Stake 3.4 MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno2} />
            </div>
          </div>
        }
        {permisions && permisions >= 2 ?
          <div className="col-12 line col-sm-4 p-4 bg-success d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">3</h2>
              {coversId3 && <>Blocks: {coversId3}</>}
              {permisions && permisions < 2 &&
                <h3 className="text-white">Completa el nivel 2 para acceder al nivel 3</h3>}
              <h1 className="text-white">X1.9</h1>
              {!loading && wallet ? <button className="btn btn-danger border" onClick={() => deposit(wallet, prices[2], 3)}>Stake 6.12 MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno3} />
            </div>
          </div>
          :
          <div className="col-12 line col-sm-4 p-4 bg-danger d-flex justify-content-center align-items-center">
            <div className="text-white">
              <h2 className="nivelNumber">3</h2>
              {coversId3 && <>Blocks: {coversId3}</>}
              <h3 className="text-white">Completa el nivel 2 para acceder al nivel 3</h3>
              <h1 className="text-white">X1.9</h1>
              {!loading && wallet ? <button className="btn btn-danger border" onClick={() => alert("Debe completar el nivel 2 primero")}>Stake 6.12 MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno3} />
            </div>
          </div>
        }
      </div>
      {loading && <Loder />}
    </div >
  )
}
export default App;
