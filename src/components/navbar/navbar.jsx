import piramid from '../../img/logo-piramid.png';
const Navbar = ({ wallet, comproveChain, resumeWallet }) => {

    return (
        <nav>
            <div className='d-flex align-items-center'>
                <img src={piramid} alt="" />
                <div className='text-logo'>
                    Piramid.lol
                </div>
            </div>
            <div>
                <a target="_blank" href="https://drive.google.com/file/d/19tLj6Ypd6fnIVvKw62BBDKMrzFkXnRBd/view?usp=sharing" className="btn btn-warning mx-2"> whitepaper </a>
                {wallet ? <>{resumeWallet(wallet)}</> : <button className="btn btn-success" onClick={comproveChain}>
                    Connect wallet
                </button>}
            </div>
        </nav>
    )
}
export default Navbar