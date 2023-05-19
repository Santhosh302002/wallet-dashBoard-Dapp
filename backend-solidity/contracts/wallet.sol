// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract wallet{
    //state variables
    struct TransactionDetails{
        address reciverAddress;
        address amount;
    }
    TransactionDetails[] public transferDetails;
    
    //functions
    function sendEth(address senderAddress) public payable {
        payable(senderAddress).transfer(msg.value);
    }
    function VIEWFUNCTION() public view returns(uint256){
        return (10);
    }

}