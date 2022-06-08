import React, { useEffect, useState } from "react"
import Web3 from 'web3'
import startApp from '../services/start'
import binanceContract from '../contracts/binanceContract'
import Loder from "./loader/loader"
import Turno from "./turno/turno"
import logo from '../img/logo-piramid.png'
import polygon from '../img/polygon.png'
import discord from '../img/discord.png'
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
  const [nextToCollect1, setNextToCollect1] = useState(false)
  const [nextToCollect2, setNextToCollect2] = useState(false)
  const [nextToCollect3, setNextToCollect3] = useState(false)
  const [in1, setIn1] = useState(false)
  const [in2, setIn2] = useState(false)
  const [in3, setIn3] = useState(false)
  const [balance, setBalance] = useState(false)

  const prices = [
    "2000000000000000000",
    "3400000000000000000",
    "6120000000000000000"
  ]

  useEffect(() => {
    comproveChain()
  }, [])
  
  const comproveChain = async ()=>{
    const chainId = web3.utils.toHex("137")
    const id = await window.ethereum.request({ method: 'eth_chainId' })
    if(id == chainId){
      getWallet()
    }else{
      window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] })
    }

  }

  const getWallet = async () => {

    setLoading(true)
    try {
      getBalance()
      const _wallet = await startApp.getWallet()
      setWallet(_wallet)
      const _ids = await getIds(_wallet)
      getInvestors()
      getCoversId(_ids)
      await getPermisions(_wallet)
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

  const getInvestors = async () => {
    try {
      const nt1 = await contract.methods.nextToCollect1().call()
      setNextToCollect1(resumeWallet(nt1))
      const nt2 = await contract.methods.nextToCollect2().call()
      setNextToCollect2(resumeWallet(nt2))
      const nt3 = await contract.methods.nextToCollect3().call()
      setNextToCollect3(resumeWallet(nt3))

      const nt4 = await contract.methods.getInvestor1().call()
      setIn1(resumeWallet(nt4))
      /* console.log(nt4) */
      const nt5 = await contract.methods.getInvestor2().call()
      setIn2(resumeWallet(nt5))
      const nt6 = await contract.methods.getInvestor3().call()
      setIn3(resumeWallet(nt6))
    } catch (error) {
      console.log(error)
    }
  }

  const getIds = async (_wallet) => {
    try {
      const _id1 = await contract.methods.getId1(_wallet).call()
      const _id2 = await contract.methods.getId2(_wallet).call()
      const _id3 = await contract.methods.getId3(_wallet).call()
  /*     console.log([_id1, _id2, _id3]) */
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

      getStorage(c1, c2, c3, _ids)

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
      contract.methods.pool1().send({ value, from: wallet }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 2) {
      contract.methods.pool2().send({ value, from: wallet }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 3) {
      contract.methods.pool3().send({ value, from: wallet }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
  }

  const getStorage = (block1, block2, block3, _ids) => {
    if (block1 > _ids[0] + 1 || block1 == _ids[0]) {
      setTurno1(false)
    } else {
      setTurno1(true)
    }
    if (block2 > _ids[1] + 2 || block2 == _ids[1]) {
      setTurno2(false)
    } else {
      setTurno2(true)

    }
    if (block3 > _ids[2] + 2 || block3 == _ids[2]) {
      setTurno3(false)
    } else {
      setTurno3(true)

    }

  }

  const resumeWallet = (wallet) => wallet.substr(wallet.length - 6, 6);

  return (
    <div className="container-fluid px-5 text-center">
      <div className="row">
        <div className="redes col-12">
          <div>
            <a href="https://discord.gg/dCDFs3XjRK" target="_blank">
              <img src={discord} alt="" />
            </a>
            <a href="https://polygonscan.com/address/0x9fB9D55d06fC7FC91162b8165727C3616523786E" target="_blank">
              <img src={polygon} alt="" />
            </a>
          </div>
          <div>
            <a target="_blank" href="https://drive.google.com/file/d/19tLj6Ypd6fnIVvKw62BBDKMrzFkXnRBd/view?usp=sharing" className="btn btn-warning mx-2"> whitepaper </a>
            {wallet ? <>{resumeWallet(wallet)}</> : <button className="btn btn-success" onClick={getWallet}>
              Connect wallet
            </button>}
          </div>
        </div>
      </div>

      <div className="row " >
        <div className="col-12 pt-2 d-flex align-items-center justify-content-between">
          <div className="">
            <img height={"200px"} src={logo} alt="" />v1.0
          </div>
          <div>
            <h4>Trabajamos en la red de polygon</h4>
            Invierte 2 MATIC y gana 11<br />Y si no esta claro, si! es una piramide
          </div>
          <div className="balance">
            <div>
              Balance de Recompensas
            </div>
            <div className="reguard">
              {balance ? <> {web3.utils.fromWei(balance,"ether") } <br /> MATIC  </> : <>0 <br />MATIC</>}
            </div>
          </div>

        </div>

        {permisions && permisions >= 0 ?
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-success h-100">
              <h2 className="ddd">1</h2>
              {coversId1 && <>Bloques generados: {coversId1}</>}
              <h3 className="text-white mt-2">Gana 3.4 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-success mb-2" onClick={() => deposit(wallet, prices[0], 1)}> Stake <br /> 2 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading</button>}
              <Turno turno={turno1} />
              <div className="">
                Proximo a cobrar: <br />
                {nextToCollect1 && nextToCollect1}<br />
                {in1 && in1}
              </div>
            </div>
          </div>
          :
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-danger h-100">
              <h2 className="">1</h2>
              {coversId1 && <>Bloques generados: {coversId1}</>}
              <p className="text-white">No disponible!</p>
              <h3 className="text-white mt-2">Gana 3.4 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-success mb-2" onClick={() => alert("Espere un momento")}> Stake <br /> 2 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading </button>}
              <Turno turno={turno1} />
              <div className="mt-3">
                Proximo a cobrar: <br />
                {nextToCollect1 && nextToCollect1}<br />
                {in1 && in1}
              </div>
            </div>
          </div>
        }

        {permisions && permisions >= 1 ?
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-success h-100">
              <h2 className="">2</h2>
              {coversId2 && <>Bloques generados: {coversId2}</>}
              {permisions && permisions < 1 &&
                <p className="text-white">Completa el nivel 1 para acceder al nivel 2</p>}
              <h3 className="text-white mt-2">Gana 6.12 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-danger mb-2" onClick={() => deposit(wallet, prices[1], 2)}>Stake <br /> 3.4 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading </button>}
              <Turno turno={turno2} />
            <div className="mt-3">
              Proximo a cobrar: <br />
              {nextToCollect2 && nextToCollect2}<br />
              {in2 && in2}
            </div>
            </div>
          </div>
          :
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-danger h-100">
              <h2 className="">2</h2>
              {coversId2 && <>Bloques generados: {coversId2}</>}
              <p className="text-white">Completa el nivel 1 para acceder al nivel 2</p>
              <h3 className="text-white mt-2">Gana 6.12 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-danger mb-2" onClick={() => alert("Debe completar el nivel 1 primero")}>Stake <br /> 3.4 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading </button>}
              <Turno turno={turno2} />
            <div className="mt-3">
              Proximo a cobrar: <br />
              {nextToCollect2 && nextToCollect2}<br />
              {in2 && in2}
            </div>
            </div>
          </div>
        }

        {permisions && permisions >= 2 ?
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-success h-100">
              <h2 className="">3</h2>
              {coversId3 && <>Bloques generados: {coversId3}</>}
              {permisions && permisions < 2 &&
                <p className="text-white">Completa el nivel 2 para acceder al nivel 3</p>}
              <h3 className="text-white mt-2">Gana 11.62 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-danger mb-2" onClick={() => deposit(wallet, prices[2], 3)}>Stake <br /> 6.12 <br /> MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno3} />
            <div className="mt-3">
              Proximo a cobrar: <br />
              {nextToCollect3 && nextToCollect3}<br />
              {in3 && in3}
            </div>
            </div>
          </div>
          :
          <div className="col-12 col-sm-4 p-4">
            <div className="text-white bg-section bg-danger h-100">
              <h2 className="">3</h2>
              {coversId3 && <>Bloques generados: {coversId3}</>}
              <p className="text-white">Completa el nivel 2 para acceder al nivel 3</p>
              <h3 className="text-white mt-2">Gana 11.62 MATIC</h3>
              {!loading && wallet ? <button className="btn btn1 btn-danger mb-2" onClick={() => alert("Debe completar el nivel 2 primero")}>Stake <br /> 6.12 <br /> MATIC</button> : <button className="btn btn-secondary"> Loading </button>}
              <Turno turno={turno3} />
            <div className="mt-3">
              Proximo a cobrar: <br />
              {nextToCollect3 && nextToCollect3}<br />
              {in3 && in3}
            </div>
            </div>
          </div>
        }
      </div>
      {loading && <Loder />}
      <div className="row">
        <div className="col-12">
          <div className="mt-5"> Todos los derechos reservados © - piramid.lol </div>
        </div>
      </div>
    </div >
  )
}
export default App;