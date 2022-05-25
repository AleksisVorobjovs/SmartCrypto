import React, { useEffect, useState, useContext } from "react";
import { contractABI, contractAddress } from "../contract_data/constants";
import { ethers } from "ethers";
import { ConnectedWalletContext } from "./ConnectedWalletContext";
//creats context
export const TransactionContext = React.createContext();

const { ethereum } = window;

const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
  return contract;
}

export const TransactionProvider = ({ children }) => {
    const {account} = useContext(ConnectedWalletContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState({ addressTo: "", amount: "", message: "", gif: ""});
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);
    const [price, setPrice] = useState();
    //updates input fields
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getTransactionsList = async () => {
      try {
        if (ethereum) {
          const contract = createContract();
          const transactionsList = await contract.getAllTransactions();
          const currentPrice = await contract.getPrice();
          setPrice(currentPrice);
          const correctTransactionsList = transactionsList.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            gif: transaction.gif,
            amount: parseInt(transaction.amount._hex) / (10 ** 18),
            price: parseInt(currentPrice._hex)
          }));
          setTransactions(correctTransactionsList);
        } else {
          console.log("Ethereum is not present");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkIfTransactionsExists = async () => {
      try {
        if (ethereum) {
          const contract = createContract();
          const count = await contract.getTransactionCount();
  
          window.localStorage.setItem("transactionCount", count);
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

    //send a transaction to blockchain
    const sendTransaction = async () => {
      try {
        if (ethereum) {
          const { addressTo, amount, message, gif} = formData;
          const contract = createContract();
          const parsedAmount = ethers.utils.parseEther(amount);
  
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: account,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            }],
          });
  
          const transactionHash = await contract.addToBlockchain(addressTo, parsedAmount, message, gif);
  
          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);
  
          const transactionsCount = await contract.getTransactionCount();
  
          setTransactionCount(transactionsCount.toNumber());
          window.location.reload();
        } else {
          console.log("No ethereum object");
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

      useEffect(() => {
        checkIfTransactionsExists();
        getTransactionsList();
      }, [transactionCount]);

    return(
        <TransactionContext.Provider value={{formData, setformData, handleChange, sendTransaction, isLoading, transactions, price}}>
            {children}
        </TransactionContext.Provider>
    );
}