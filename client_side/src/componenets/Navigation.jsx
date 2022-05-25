import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ConnectedWalletContext } from "../context/ConnectedWalletContext";


const Navigation = () => {
    //store the aplication state (mobile or desktop=false)
    const [toggleMenu, setToggleMenu] = React.useState(false);
    //stores the aplication state for user login in
    const {connectWallet, account} = useContext(ConnectedWalletContext);
    return(
        <nav className="w-full flex md:justify-center justify-between p-3">
            <div className="md:flex-[0.5]">
                <img src="../../images/logo.png" alt="logo" className="w-32 cursor-pointer"/>
            </div>
            <ul className="text-[#efece6] md:flex hidden items-center">
                <li className="mx-4 cursor-pointer"><a href="https://coinmarketcap.com/" target="_blank">Crypto Market</a></li>
                {!account.length && (
                    <button type="button" onClick={connectWallet} className="bg-[#2952e3] py-2 px-6 mx-4 rounded-full cursor-pointer hover:bg-[#2546bb]">
                        <p className="text-[#efece6] text-base font-semibold">Connect Wallet</p>
                    </button>
                )}
            </ul>
            <div className="flex">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={32} className="text-[#efece6] md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <ul className="text-[#efece6] flex md:hidden fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl flex-col justify-start items-end rounded-md  blue-glassmorphism">
                        <li className="text-xl w-full p-4"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                        <li className="mx-4 cursor-pointer my-2 text-xl"><a href="https://coinmarketcap.com/" target="_blank">Crypto Market</a></li>
                        {!account.length && (
                            <button type="button" onClick={connectWallet} className="bg-[#2952e3] py-2 px-6 rounded-full cursor-pointer hover:bg-[#2546bb]">
                                <p className="text-[#efece6] text-base font-semibold">Connect Wallet</p>
                            </button>
                        )}
                    </ul>    
                )}
            </div>
        </nav>
    );
}
export default Navigation;