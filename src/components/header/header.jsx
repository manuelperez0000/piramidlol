import logo from '../../img/logo-piramid.png'
const Header = ({ balance, web3 }) => {
    return (<>
        <div className="col-12">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2 d-flex align-items-center justify-content-center">
                        <div>
                        <img height={"200px"} src={logo} alt="" /><br></br>v2.1
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 d-flex align-items-center justify-content-center'>
                        <div>
                            <h4>Trabajamos en la red de polygon</h4>
                            Invierte 2 MATIC y gana 11<br />Y si no esta claro, si! es una piramide
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2 d-flex align-items-center justify-content-center">
                        <div>
                            <div>
                                Balance de Recompensas
                            </div>
                            <div className="reguard">
                                {balance ? <> {web3.utils.fromWei(balance, "ether")} <br /> MATIC  </> : <>0 <br />MATIC</>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Header