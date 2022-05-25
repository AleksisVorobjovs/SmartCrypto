import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { ConnectedWalletContext } from "../context/ConnectedWalletContext";
import { TransactionContext } from "../context/TransactionContext";
const TransactionCreation = () => {
  const {connectWallet,account,shortAddress} = useContext(ConnectedWalletContext);
  const {formData,sendTransaction,handleChange,isLoading,price} = useContext(TransactionContext);
  //create the same type of data that is returned from smart contract timestamp
  var today = new Date();
  const date = today.getDate()+'/'+(today.getMonth() + 1)+'/'+today.getFullYear()+', '+today.getHours() +':'+today.getMinutes()+':'+today.getSeconds();
  //handle user submit
  var gifurl = "";
  const handleSubmit = (e) => {
    const {addressTo,amount,message,gif}=formData;
    e.preventDefault();
    if (!addressTo||!amount||!message)return;
    if(message.length>512){
      alert("Message is too long. Max:512 Current Length:"+message.length); 
      return;
    }
    sendTransaction();
    
  };
  return(
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
      {account.length==0 &&(
        <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-[#efece6] py-1">Make Everyday<br/>Transactions Fun</h1>
          <p className="text-left mt-5 text-[#efece6] font-light md:w-9/12 w-11/12 text-base">
            Create custom transactions with no extra fees, to make your everyday life more fun with crypto.
          </p>
            <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bb]">
              <p className="text-[#efece6] font-semibold">Connect Wallet</p>
            </button>
        </div>
      )}
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 w-72 my-5 card">
            <div className="flex justify-between flex-col w-full h-full">
              <SiEthereum fontSize={25} color="#efece6" />
              <div>
                <p className="text-[#efece6] font-light text-sm">{shortAddress}</p>
                <p className="text-[#efece6] font-semibold text-lg">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex-col blue-glassmorphism">
          {isLoading ? 
            <div className="items-center flex justify-center py-3">
              <div className="animate-spin border-b-2 rounded-full border-blue-700 h-24 w-24"/>
            </div>
          : (
            <div>
              <input name="addressTo" className=" w-full rounded-sm p-2 bg-transparent text-[#efece6] border-none text-sm" placeholder="Address" type="text" onChange={(e) => handleChange(e, "addressTo")}/>
              <input name="amount" className="my-2 w-full rounded-sm p-2 bg-transparent text-[#efece6] border-none text-sm" placeholder="ETH" type="number" step="0.001" onChange={(e) => handleChange(e, "amount")}/>
              <input name="gif" className="my-2 w-full rounded-sm p-2 bg-transparent text-[#efece6] border-none text-sm" placeholder="Gif" type="text" onChange={(e) => handleChange(e, "gif")}/>
              <input name="message" className="my-2 w-full rounded-sm p-2 bg-transparent text-[#efece6] border-none text-sm" placeholder="Message" type="text" onChange={(e) => handleChange(e, "message")}/>
              <button type="button" onClick={handleSubmit} className="text-[#efece6] w-full border-[1px] p-2 border-[#3d5f7c] hover:bg-[#3d5888] rounded-full cursor-pointer font-semibold">Send</button>
            </div>
            )}
          </div>
        </div>
        {account.length!=0 &&(
        <div className="flex w-full justify-center items-start">
          <div className="flex flex-col items-start justify-between md:p-5 px-4">
          <h3 className="text-3xl sm:text-5xl text-[#efece6] py-1">Preview</h3>
          <div className="blue-glassmorphism flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[450px] sm:max-w-[500px] sm-w-full flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
              <div className="display-flex justify-start w-full mb-6 p-2">
                <p className="text-[#efece6] text-base" style={{flex: 1, flexWrap: 'wrap'}}>From: {shortAddress}</p>
                <p className="text-[#efece6] text-base" style={{flex: 1, flexWrap: 'wrap'}}>To: {`${formData.addressTo.slice(0, 5)} . . . ${formData.addressTo.slice(formData.addressTo.length - 4)}`}</p>
                <p className="text-[#efece6] text-base flex: 0.8" style={{flex: 1, flexWrap: 'wrap'}}>Amount: {formData.amount} ETH - {Math.round(formData.amount*price * 100) / 100} USD</p>
                <p className="text-[#efece6] text-base" style={{flex: 1, flexWrap: 'wrap'}}>Message: {formData.message}</p>
              </div>
              <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
              <img
          src={gifurl}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
                <p className="text-[#37c7da] font-bold">{date}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
export default TransactionCreation;