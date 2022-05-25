import React, { useEffect, useState } from "react";
//creats context for available wallet
export const ConnectedWalletContext = React.createContext();
const { ethereum } = window;

export const ConnectedWalletProvider = ({ children }) =>{
    const [account, setAccount] = useState([]);
    const shortAddress = `${account.slice(0, 5)} . . . ${account.slice(account.length - 4)}`;
    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
        
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if(accounts.length){
                setAccount(accounts[0]);
                //getAllTransactions()
            }else{
                console.log("No accounts connected");
            }
        }catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
        
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
            setAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return(
        <ConnectedWalletContext.Provider value={{connectWallet, account, shortAddress}}>
            {children}
        </ConnectedWalletContext.Provider>
    );
}