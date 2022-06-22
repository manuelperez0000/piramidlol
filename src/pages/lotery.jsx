import '../css/lotery.css'
import Web3 from 'web3'
import loteryContract from '../contracts/lotery/lotery'
import { useEffect, useState } from 'react'
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(loteryContract.abi, loteryContract.address)

const Lotery = ({ wallet }) => {

    const [ronda, setRonda] = useState(false)
    const [tickets, setTickets] = useState(false)
    const [lastWiner, setLastWiner] = useState(false)

    useEffect(() => {
        start()
    }, [])
    const start = async () => {
        const _ronda = await contract.methods.ronda().call()
        setRonda(_ronda)
        const _tickets = await contract.methods.ticket().call()
        setTickets(_tickets)
        const _lastWiner = await contract.methods.lastWiner().call()
        setLastWiner(_lastWiner)
    }

    const winers = async (e) => {
        e.preventDefault()
        const _ronda = e.target.win.value
        const _winer = await contract.methods.winers(_ronda).call()
        alert("El ganador en la ronda " + _ronda + " fue " + _winer)
    }

    const players = async (e) => {
        e.preventDefault()
        const _player = e.target.player.value
        const _play = await contract.methods.players(_player).call()
        alert("El jugador " + _player + " es " + _play)
    }

    const buyTicket = async () => {
        const value = "1100000000000000000"
        try {
            await contract.methods.beats().send({ value, from: wallet })
            start()
        } catch (error) {
            console.log(error)
        }
    }
    return (<div className='p-4'>
        <div className="lotery">
            <h1 className='text-white text-lotery'>
                Bienvenido a la loteria descentralizada<br /> de Piramid.lol
            </h1>
        </div>
        <div className='mt-4'>
            <h4>¿Como funciona?</h4>
            <p>Para participar en la lotería descentralizada solo deberás comprar uno o más tickets en una ronda, el precio de cada ticket es de 1 matic, al completar la venta de 10 tickets el contrato
                elegirá de forma aleatoria a una de las 10 wallets que se encuentran almacenadas y realizara un pago único de 10 Matic al ganador y durante este proceso se reiniciaran todas las wallets para así 
                continuar con la siguiente ronda, solo se elegirá un ganador al completar los 10 tickets.
            </p>
        </div>
        <div className='mt-3 lotery-section'>
            <div className="">
                <div className="row">
                    <div className="col-9">
                        <h1>Tickets vendidos {tickets} / 10</h1>
                        <h4>Precio: 1.1 MATIC</h4>
                        <p>Ultimo ganador: {lastWiner && lastWiner == "0x0000000000000000000000000000000000000000" ? <>Todavia no tenemos un ganador</> : lastWiner}</p>
                        <div></div>
                        <h4>Consultar ganadores anteriores</h4>
                        <form action="" onSubmit={(e) => winers(e)}>
                            <input className='input-consult' name="win" type="number" step="1" min="1" max="9999" placeholder='Numero de Ronda' />
                            <button className='btn-consult'> Consultar </button>
                        </form>

                        <h4 className='mt-4'>Consultar jugadores</h4>
                        <form action="" onSubmit={(e) => players(e)}>
                            <input className='input-consult' name="player" type="number" step="1" min="0" max="9999" placeholder='Numero de Ronda' />
                            <button className='btn-consult'> Consultar </button>
                        </form>

                    </div>
                    <div className="col-3">
                        <div className='rondas'>
                            <div>Ronda</div>
                            <div className='numberRonda'>{ronda & ronda}</div>
                        </div>
                        <button onClick={buyTicket} className='ticket-btn'> Comprar ticket </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Lotery