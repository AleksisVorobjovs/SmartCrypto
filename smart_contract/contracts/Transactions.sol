// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
//importing interfece that will allow me to get price of crypto
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Transactions {
    //stores transaction count
    uint256 transactionCount;

    AggregatorV3Interface internal priceFeed;

    constructor() {
        //ETH - USD (Rinkby network)
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }

    //creats event with variables that will be recived
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string gif);
    
    //creats struct with varaibles that are being stored
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string gif;
    }
    //creates array with transactions
    TransferStruct[] transactions;

    //adds new transaction to blockchain
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory gif) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, gif));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, gif);
    }

    //returns list of all transactions on this contract
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }
    //returns transaction count
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
    function getPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price/10**8;
    }
}
