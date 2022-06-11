import React, { useEffect, useState } from "react"
import Web3 from 'web3'
import startApp from '../services/start'
import binanceContract from '../contracts/binanceContract'
import Loder from "./loader/loader"
import Turno from "./turno/turno"
import Header from './header/header'
import Navbar from "./navbar/navbar"
import Footer from "./footer/footer"
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(binanceContract.abi, binanceContract.address)
function App() {

  const [wallet, setWallet] = useState(false)
  const [loading, setLoading] = useState(true)
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

  const gas = "170000"
  const [gasPrice, setGasPrice] = useState("35000000000")
  const [bgSection1, setBgSection1] = useState({ background: "gray" })
  const [bgSection2, setBgSection2] = useState({ background: "gray" })
  const [bgSection3, setBgSection3] = useState({ background: "gray" })
  const [investorId1, setInvestorId1] = useState(false)
  const [investorId2, setInvestorId2] = useState(false)
  const [investorId3, setInvestorId3] = useState(false)

  const prices = [
    "2000000000000000000",
    "3400000000000000000",
    "6120000000000000000"
  ]

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
    getGasPrice()
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

  const getGasPrice = async () => {
    const _gasPrice = await web3.eth.getGasPrice()
    setGasPrice(_gasPrice)
  }

  const getBalance = async () => {
    contract.methods.balance().call().then(res => {
      setBalance(res)
    }).catch(err => console.log(err))
  }

  const getInvestors = async () => {
    try {

      const _investorId1 = await contract.methods.investorId1().call()
      setInvestorId1(_investorId1)
      const _investorId2 = await contract.methods.investorId2().call()
      setInvestorId2(_investorId2)
      const _investorId3 = await contract.methods.investorId3().call()
      setInvestorId3(_investorId3)

      const nt1 = await contract.methods.nextToCollect1().call()
      setNextToCollect1(resumeWallet(nt1))
      const nt4 = await contract.methods.nextToCollect2().call()
      setIn1(resumeWallet(nt4))

      const nt2 = await contract.methods.nextToCollect1b().call()
      setNextToCollect2(resumeWallet(nt2))
      const nt5 = await contract.methods.nextToCollect2b().call()
      setIn2(resumeWallet(nt5))

      const nt3 = await contract.methods.nextToCollect1c().call()
      setNextToCollect3(resumeWallet(nt3))
      const nt6 = await contract.methods.nextToCollect2c().call()
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
    } catch (error) {
      console.error(error)
    }
  }

  const getId = async (e, _id) => {
    e.preventDefault()
    setLoading(true)
    if (_id == 1) {
      try {
        const _id = await contract.methods.getId1(e.target.wallet.value).call()
        alert("Tu puesto es: " + _id)
        setLoading(false)
      } catch (error) {
        alert("Wallet invalida")
        setLoading(false)
      }
    } else if (_id == 2) {
      try {
        const _id = await contract.methods.getId2(e.target.wallet.value).call()
        alert("Tu puesto es: " + _id)
        setLoading(false)
      } catch (error) {
        alert("Wallet invalida")
        setLoading(false)
      }
    } else if (_id == 3) {
      try {
        const _id = await contract.methods.getId3(e.target.wallet.value).call()
        alert("Tu puesto es: " + _id)
        setLoading(false)
      } catch (error) {
        alert("Wallet invalida")
        setLoading(false)
      }
    } else {
      alert("El id no es correcto")
    }
  }

  const getPermisions = async (_wallet) => {
    try {
      const permis = await contract.methods.permisions(_wallet).call()
      if (permis == 0) {
        setBgSection1({ backgroundColor: "#198754" })
        setBgSection2({ backgroundColor: "red" })
        setBgSection3({ backgroundColor: "red" })
      } else if (permis == 1) {
        setBgSection1({ backgroundColor: "#198754" })
        setBgSection2({ backgroundColor: "#198754" })
        setBgSection3({ backgroundColor: "red" })
      } else if (permis >= 2) {
        setBgSection1({ backgroundColor: "#198754" })
        setBgSection2({ backgroundColor: "#198754" })
        setBgSection3({ backgroundColor: "#198754" })
      }
      setPermisions(permis)
      return
    } catch (error) {
      console.log(error)
    }
  }

  const deposit = async (wallet, value, nivel) => {
    setLoading(true)
    if (nivel == 1) {
      contract.methods.pool1().send({ value, from: wallet, gas, gasPrice }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 2) {
      contract.methods.pool2().send({ value, from: wallet, gas, gasPrice }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }

    if (nivel == 3) {
      contract.methods.pool3().send({ value, from: wallet, gas, gasPrice }).then(res => {
        getWallet()
        alert("Felicitaciones! ahora solo debes esperar que ingresen algunos mas")
      }).catch(err => console.log(err)).finally(() => {
        setLoading(false)
      })
    }
  }

  const getWalletFromId = async (e, _id) => {
    e.preventDefault()
    if (_id == 1) {
      const __id = e.target.wallet2.value
      const _wallet = await contract.methods.covers1(__id).call()
      alert("En el bloque " + __id + " se encuentra " + _wallet)
    } else if (_id == 2) {
      const __id = e.target.wallet2.value
      const _wallet = await contract.methods.covers2(__id).call()
      alert("En el bloque " + __id + " se encuentra " + _wallet)
    } else if (_id == 3) {
      const __id = e.target.wallet2.value
      const _wallet = await contract.methods.covers3(__id).call()
      alert("En el bloque " + __id + " se encuentra " + _wallet)
    }
  }

  return (
    <div className="container-fluid px-5 text-center">

      <Navbar wallet={wallet} resumeWallet={resumeWallet} comproveChain={comproveChain} />

      <div className="row " >
        <Header balance={balance} web3={web3} />

        <div className="col-12 col-md-6 p-4">
          <div className="text-white bg-section h-100" style={bgSection1}>
            <h2 className="ddd mt-2">Stake 1</h2><hr />
            {coversId1 && <>Bloques pagados: {coversId1}</>}<br></br>
            {investorId1 && <>Generados: {investorId1}</>}
            <h3 className="text-white mt-2">Gana 3.4 MATIC</h3>
            {!loading && wallet ? <button className="btn btn1 btn-success mb-2" onClick={() => deposit(wallet, prices[0], 1)}> Stake <br /> 2 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading</button>}
            <hr />
            <div>
              <form action="" onSubmit={e => getId(e, 1)}>
                <span>Consulta tu puesto de cobro</span>
                <input className='w-100' name="wallet" type="text" placeholder="Intruduce tu wallet" />
                <button className='mt-2'> Consultar Puesto </button>
              </form>
            </div>
            <hr />
            <span>Consulta quien viene a cobrar</span>
            <form action="" onSubmit={e => getWalletFromId(e, 1)}>
                <input className='w-100' name="wallet2" type="number" max="9999" placeholder="Intruduce el n° de bloque" />
                <button className='mt-2'> Consultar </button>
            </form>
            <hr />
            <div className="">
              Proximo a cobrar: <br />
              {nextToCollect1 && nextToCollect1}<br />
              {in1 && in1}
            </div>
          </div>
        </div>

        {/***************** 2 ************************** */}

        <div className="col-12 col-md-6 p-4">
          <div className="text-white bg-section h-100" style={bgSection1}>
            <h2 className="ddd mt-2">Stake 2</h2><hr />
            {coversId2 && <>Bloques pagados: {coversId2}</>}<br></br>
            {investorId2 && <>Generados: {investorId2}</>}
            <h3 className="text-white mt-2">Gana 6.12 MATIC</h3>
            {!loading && wallet ? <button className="btn btn1 btn-success mb-2" onClick={() => deposit(wallet, prices[1], 2)}> Stake <br /> 3.4 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading</button>}
            <hr />
            <div>
              <form action="" onSubmit={e => getId(e, 2)}>
                <span>Consulta tu puesto de cobro</span>
                <input className='w-100' name="wallet" type="text" placeholder="Intruduce tu wallet" />
                <button className='mt-2'> Consultar Puesto </button>
              </form>
            </div>
            <hr />
            <span>Consulta quien viene a cobrar</span>
            <form action="" onSubmit={e => getWalletFromId(e, 2)}>
              <input className='w-100' name="wallet2" type="number" max="9999" placeholder="Intruduce el n° de bloque" />
              <button className='mt-2'> Consultar </button>
            </form>
            <hr />
            <div className="">
              Proximo a cobrar: <br />
              {nextToCollect2 && nextToCollect2}<br />
              {in2 && in2}
            </div>
          </div>
        </div>
        {/***************** 3 ************************** */}

        <div className="col-12 col-md-6 p-4">
          <div className="text-white bg-section h-100" style={bgSection1}>
            <h2 className="ddd mt-2">Stake 3</h2><hr />
            {coversId3 && <>Bloques pagados: {coversId3}</>}<br></br>
            {investorId3 && <>Generados: {investorId3}</>}
            <h3 className="text-white mt-2">Gana 11.62 MATIC</h3>
            {!loading && wallet ? <button className="btn btn1 btn-success mb-2" onClick={() => deposit(wallet, prices[2], 3)}> Stake <br /> 6.12 <br /> MATIC</button> : <button className="btn btn-secondary mb-2"> Loading</button>}
            <hr />
            <div>
              <form action="" onSubmit={e => getId(e, 3)}>
                <span>Consulta tu puesto de cobro</span>
                <input className="w-100" name="wallet" type="text" placeholder="Intruduce tu wallet" />
                <button className="mt-2"> Consultar Puesto </button>
              </form>
            </div>
            <hr />
            <span>Consulta quien viene a cobrar</span>
            <form action="" onSubmit={e => getWalletFromId(e, 3)}>
              <input className='w-100' name="wallet2" type="number" max="9999" placeholder="Intruduce el n° de bloque" />
              <button className='mt-2'> Consultar </button>
            </form>
            <hr />
            <div className="">
              Proximo a cobrar: <br />
              {nextToCollect3 && nextToCollect3}<br />
              {in3 && in3}
            </div>
          </div>
        </div>
      </div>

      {loading && <Loder />}
      <Footer />
    </div >
  )
}
export default App;