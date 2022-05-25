import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ConnectedWalletContext } from "../context/ConnectedWalletContext";
import FetchGif from "../hooks/FetchGif";
const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, gif, amount,price}) => {
  const gifUrl = FetchGif({ gif });
  return (
    <div className="blue-glassmorphism m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://rinkeby.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-[#efece6] text-base">From: {`${addressFrom.slice(0, 5)} . . . ${addressFrom.slice(addressFrom.length - 4)}`}</p>
          </a>
          <a href={`https://rinkeby.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-[#efece6] text-base">To: {`${addressTo.slice(0, 5)} . . . ${addressTo.slice(addressTo.length - 4)}`}</p>
          </a>
          <p className="text-[#efece6] text-base">Amount: {amount}ETH - {Math.round(price*amount * 100) / 100}USD</p>
          {message && (
            <>
              <br />
              <p className="text-[#efece6] text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
    const { transactions } = useContext(TransactionContext);
    const {account} = useContext(ConnectedWalletContext);
  
    return (
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transaction-history">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {account.length!=0&&(
            <div className="flex flex-col md:p-12 py-12 px-4">
              <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
              <div className="flex flex-wrap justify-center items-center mt-10">
                {[...transactions].reverse().slice(0, 9).map((transaction, i) => (
                    <TransactionsCard key={i} {...transaction} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
export default TransactionHistory;