const Header = ({ balance, web3 }) => {
    return (<>
        <div className="col-12">
            <div className="d-flex align-items-center justify-content-between mt-4 mx-4">
                <h1>Piramid Clasic</h1>
                <div>
                    <div>
                        Balance de Recompensas
                    </div>
                    <div className="reguard">
                        {balance ? <b> {web3.utils.fromWei(balance, "ether")}  MATIC  </b> : <b>0 MATIC</b>}
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default Header