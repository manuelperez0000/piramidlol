import '../css/tokens.css'
import piramidLogo from '../img/logo-piramid.png'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import piramidLauncher from '../contracts/presales/piramidLauncher/launcher'
import startApp from '../services/start'
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(piramidLauncher.abi, piramidLauncher.address)
const Tokens = () => {
    const [modal, setModal] = useState(false)
    const [amountSold, setAmountSold] = useState(false)
    const [buyedTokens, setBuyedTokens] = useState(false)
    const [wallet, setWallet] = useState(false)
    const [pausedContract, setPausedContract] = useState(true)

    useEffect(() => {start()}, [])

    const start = async () => {
        const _wallet = await startApp.getWallet()
        setWallet(_wallet)
        console.log(contract.methods)
        contract.methods.amountSold().call().then(_ => setAmountSold(_))
        contract.methods.buyedTokens(_wallet).call().then(_ => setBuyedTokens(_))
        contract.methods.pause().call().then(_ => setPausedContract(_))
    }

    const buy = (amount) => {
        const value = web3.utils.toWei(amount, "ether")
        contract.methods.buy().send({ from: wallet, value })
    }
    return (
        <div className="container-fluid pt-3">
            {modal && <div className="modalBackground">
                <div className='modalIn pt-4'>
                    <h3>Creacion de tokens</h3>
                    Brindamos el servicio de creación de tokens en las redes de Polygon y BSC, el costo de creación es de 20 USDT en la red de Polygon y 25 USDT en la red de BSC, El token se creara y se realizara la verificación correspondiente en Polygonscan o bscscan, una ves creado la totalidad de tokens serán enviados a la wallet asignada por el usuario.
                    <br /><br />
                    Para realizar la creación del token deberás comunicarte con algún administrador a través del discord y al concretar el pago tardara entre una y 2 horas para el despliegue y verificación del mismo<br /><br />
                    <h3>Preventa de tokens</h3>
                    Si ya posees un token en la red de Polygon o Binance podemos realizar para ti un contrato de preventa donde los usuarios podrán comprar de forma anticipada tus tokens, el costo de servicio es de 30 USDT Mensuales, una ves creado el contrato podrás usarlo para vender tus tokens a través de nuestra plataforma o alguna plataforma externa. Contacta con nosotros para mas información <br />
                    <a target="_blank" href="https://discord.gg/dCDFs3XjRK">Ir a Discord</a><br /><br />
                    <div className='text-center'>
                        <button onClick={() => setModal(false)} className='btn btn-danger'> Cerrar </button>
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-12 between px-5 pb-3">
                    <h1>Preventa de Tokens</h1>
                    <button onClick={() => setModal(true)} className='btn btn-primary'> + Crear un Token </button>
                </div>
                <div className="col-12">
                    <div className="">
                        <div className="container-fluid">
                            <div className="row gx-3">
                                <div className="col-12 col-md-8 line-right p-3 tokenWrap">
                                    <div className='between px-4'>
                                        <div className='d-flex'>
                                            <div>
                                                <img height="30px" src={piramidLogo} alt="" />
                                            </div>
                                            <h3 className='mx-2'>Piramid Token</h3>
                                        </div>
                                        {pausedContract ? <div className='bg-secondary px-3 text-dark card'>
                                            • No Iniciado
                                        </div>
                                        :
                                        <div className='bg-success px-3 text-light card'>
                                            ► Disponible
                                        </div>
                                        }
                                    </div>
                                    <div className='between px-4'>
                                        Token de utilidad y recompensas dentro de la plataforma de piramid.lol,
                                        se usara dentro de la loteria, piramides futuras y dentro de Piramid Metavers para
                                        comprar y vender Skins y Nft's de utilidad dentro del metaverso.
                                    </div>
                                    <div className='between'>
                                        <b>Contrato de preventa</b>
                                        <p>0x1E2972097086e75c8BF06838Bc6fDB98bf7b9579</p>
                                    </div>
                                    <div className='between'>
                                        <b>Contrato del token</b>
                                        <p>0x6E328eba6CB1ABd175F6622262DB1a3a2AfE6Da8</p>
                                    </div>
                                    <div className='between'>
                                        <b>Symbol</b>
                                        <p>PIRAMID</p>
                                    </div>
                                    <div className='between'>
                                        <b>Cantidad de decimales</b>
                                        <p>18</p>
                                    </div>
                                    <div className='between'>
                                        <b>Total Supply</b>
                                        <p>1.000.000</p>
                                    </div>
                                    <div className='between'>
                                        <b>Tokens en venta</b>
                                        <p>300.000</p>
                                    </div>
                                    <div className='between'>
                                        <b>Tokens para liquidez</b>
                                        <p>300.000</p>
                                    </div>
                                    <div className='between'>
                                        <b>Tokens de recompensas</b>
                                        <p>300.000</p>
                                    </div>
                                    <div className='between'>
                                        <b>Reservas</b>
                                        <p>100.000</p>
                                    </div>
                                    {pausedContract ? <div>
                                        <div className='card text-danger p-3 mb-2'>
                                            <h4>
                                                Preventa no iniciada
                                            </h4>
                                        </div>
                                        <div className='d-inline-block'>
                                            <button className='btn btn-secondary' disabled> Comprar 1 MATIC</button>
                                            <button className='btn btn-secondary' disabled> Comprar 5 MATIC</button>
                                            <button className='btn btn-secondary' disabled> Comprar 10 MATIC</button>
                                            <button className='btn btn-secondary' disabled> Comprar 20 MATIC</button>
                                            <button className='btn btn-secondary' disabled> Comprar 50 MATIC</button>
                                            <button className='btn btn-secondary' disabled> Comprar 100 MATIC</button>
                                        </div>
                                    </div> : <div className='d-inline-block'>
                                        <button onClick={() => buy("1")} className='btn btn-primary'> Comprar 100 Piramid </button>
                                        <button onClick={() => buy("5")} className='btn btn-primary'> Comprar 500 Piramid </button>
                                        <button onClick={() => buy("10")} className='btn btn-primary'> Comprar 1000 Piramid </button>
                                        <button onClick={() => buy("20")} className='btn btn-primary'> Comprar 2000 Piramid </button>
                                        <button onClick={() => buy("50")} className='btn btn-primary'> Comprar 5000 Piramid </button>
                                        <button onClick={() => buy("100")} className='btn btn-primary'> Comprar 10000 Piramid </button>
                                    </div>
                                    }
                                </div>
                                <div className="col-12 col-md-4 p-3 tokenWrap">
                                    <div className='between'>
                                        <b>Ventas Acumuladas</b>
                                        <p>{amountSold} MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Status</b>
                                        <p>No disponible</p>
                                    </div>
                                    <div className='between'>
                                        <b>Tipo de venta</b>
                                        <p>Publico</p>
                                    </div>
                                    <div className='between'>
                                        <b>Compra Minima</b>
                                        <p>1 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Compra Maxima</b>
                                        <p>100 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Tu Compra</b>
                                        <p>{buyedTokens} PIRAMID</p>
                                    </div>
                                    <div className='between'>
                                        <b>Soft Cap</b>
                                        <p>30000 PIRAMID</p>
                                    </div>
                                    <div className='between'>
                                        <b>Hard Cap</b>
                                        <p>300000 PIRAMID</p>
                                    </div>
                                    <div className='between'>
                                        <b>Fecha de inicio</b>
                                        <p>07/22/2022</p>
                                    </div>
                                    <div className='between'>
                                        <b>Precio de salida</b>
                                        <p>0.01 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Equivalencia</b>
                                        <p>1 MATIC = 100 PIRAMID</p>
                                    </div>
                                    <div className='text-center'>
                                        {pausedContract ? 
                                        <button className='btn btn-secondary mt-4' disabled> Reclamar mis tokens </button>
                                        :
                                        <button className='btn btn-primary mt-4'> Reclamar mis tokens </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tokens