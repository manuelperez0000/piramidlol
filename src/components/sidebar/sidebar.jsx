import { NavLink } from 'react-router-dom'
import "../../css/sidebar.css"
import polygon from '../../img/polygon.png'
import discord from '../../img/discord.png'
import binanceContract from '../../contracts/binanceContract'
const Sidebar = () => {
    return (<div className="sidebar">
        <div className='sidebarWrap'>
            <div className='w-100 '>
                <NavLink to='/clasic' className='link'>
                    <div className='text-sidebar'>
                        ♥ Piramid clasic
                    </div>
                </NavLink> 
                <NavLink to='/lotery' className='link'>
                    <div className='text-sidebar'>
                        ♦ Lotery
                    </div>
                </NavLink>
                <NavLink to='/referals' className='link'>
                    <div className='text-sidebar'>
                        ♠  Referals
                    </div>
                </NavLink>
                <NavLink to='/launcher' className='link'>
                    <div className='text-sidebar'>
                        ☺  Launcher
                    </div>
                </NavLink>
                <NavLink to='/tokens' className='link'>
                    <div className='text-sidebar'>
                        ☻  Tokens
                    </div>
                </NavLink>
                <NavLink to='/market' className='link'>
                    <div className='text-sidebar'>
                        •  NFT's
                    </div>
                </NavLink>
            </div>
            <div className='w-100'>
                <div className='mb-4 d-flex justify-content-around align-items-center'>
                    <a className='text-center' href="https://discord.gg/dCDFs3XjRK" target="_blank">
                        <img height={"50px"} src={discord} alt="" /><br/> Discord
                    </a>
                    <a className='text-center' href={"https://polygonscan.com/address/" + binanceContract.address} target="_blank">
                        <img height={"50px"} src={polygon} alt="" /><br/> Polygon
                    </a>
                </div>
            </div>
        </div>
    </div>)
}
export default Sidebar