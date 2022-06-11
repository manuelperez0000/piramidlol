import polygon from '../../img/polygon.png'
import discord from '../../img/discord.png'
import binanceContract from '../../contracts/binanceContract'
const Navbar = ({wallet,comproveChain,resumeWallet}) => {
    
    return (
        <div className="row">
            <div className="redes col-12">
                <div>
                    <a href="https://discord.gg/dCDFs3XjRK" target="_blank">
                        <img src={discord} alt="" />
                    </a>
                    <a href={"https://polygonscan.com/address/" + binanceContract.address} target="_blank">
                        <img src={polygon} alt="" />
                    </a>
                </div>
                <div>
                    <a target="_blank" href="https://drive.google.com/file/d/19tLj6Ypd6fnIVvKw62BBDKMrzFkXnRBd/view?usp=sharing" className="btn btn-warning mx-2"> whitepaper </a>
                    {wallet ? <>{resumeWallet(wallet)}</> : <button className="btn btn-success" onClick={comproveChain}>
                        Connect wallet
                    </button>}
                </div>
            </div>
        </div>
    )
}
export default Navbar