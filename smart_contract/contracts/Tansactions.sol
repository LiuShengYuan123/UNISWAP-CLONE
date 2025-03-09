// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transactions {
    event Transfer(
        address sender,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    function publicTransaction(
        address receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public payable {
       require(msg.value == amount, "Amount does not match sent Ether");

       payable(receiver).transfer(amount);

       emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }
}
