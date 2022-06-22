import '../css/tokens.css'
import piramidLogo from '../img/logo-piramid.png'
import { useState } from 'react'
const Tokens = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className="container-fluid pt-3">
            {modal && <div className="modalBackground">
                <div className='modalIn pt-4'>
                    <h3>Creacion de tokens</h3>
                    Brindamos el servicio de creacion de tokens en las redes de Polygon y BSC,
                    el costo de creacion es de 20 USDT en la red de Polygon y 25 USDT en la red de BSC,
                    El token se creara y se realizara la verificacion correspondiente en Polygonscan o bscscan,
                    una ves creado la totalidad de tokens seran enviados a la wallet asignada por el usuario.
                    <br /><br />
                    Para realizar la creacion del token deberas comunicarte con algun administrador a traves del discord y al concretar
                    el pago tardara entre una y 2 horas para el despliegue y verificacion del mismo  <br /><br />
                    <h3>Preventa de tokens</h3>
                    Si ya posees un token en la red de Polygon o Binance podemos realizar para ti un contrato de preventa 
                    donde los usuarios podran comprar de forma anticipada tus tokens, el costo de servicio es de 30 USDT Mensuales, 
                    una ves creado el contrato podras usarlo para vender tus tokens a traves de nuestra plataforma o alguna plataforma externa.
                    Contacta con nosotros para mas informacion <br/>
                    <a target="_blank" href="https://discord.gg/dCDFs3XjRK">Ir a Discord</a><br /><br />
                    <div className='text-center'>
                        <button onClick={() => setModal(false)} className='btn btn-danger'> Cerrar </button>
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-12 between px-5 pb-3">
                    <h1>Preventa de Tokens</h1>
                    <button onClick={() => setModal(true)} className='btn btn-primary'> + Crear </button>
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
                                        <div className='bg-secondary px-3 text-dark card'>
                                            • No Iniciado
                                        </div>
                                    </div>
                                    <div className='between px-4'>
                                        Token de utilidad y recompensas dentro de la plataforma de piramid.lol,
                                        se usara dentro de la loteria, piramides futuras y dentro de Piramid Metavers para
                                        comprar y vender Skins y Nft's de utilidad dentro del metaverso.
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
                                        <p>900.000</p>
                                    </div>
                                    <button className='btn btn-primary'> Comprar 1 MATIC</button>
                                    <button className='btn btn-primary'> Comprar 5 MATIC</button>
                                    <button className='btn btn-primary'> Comprar 10 MATIC</button>
                                    <button className='btn btn-primary'> Comprar 20 MATIC</button>
                                    <button className='btn btn-primary'> Comprar 50 MATIC</button>
                                    <button className='btn btn-primary'> Comprar 100 MATIC</button>
                                </div>
                                <div className="col-12 col-md-4 p-3 tokenWrap">
                                    <div className='between'>
                                        <b>Ventas Acumuladas</b>
                                        <p>0 MATIC</p>
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
                                        <p>0 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Soft Cap</b>
                                        <p>3000 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Hard Cap</b>
                                        <p>900.000 MATIC</p>
                                    </div>
                                    <div className='between'>
                                        <b>Fecha de inicio</b>
                                        <p>No disponible</p>
                                    </div>
                                    <div className='between'>
                                        <b>Precio de salida</b>
                                        <p>0.01 MATIC</p>
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