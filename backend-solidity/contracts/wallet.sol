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
    function sendEth(address payable senderAddress) public payable {
        (bool sent, bytes memory data) = senderAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    function VIEWFUNCTION() public view returns(uint256){
        return (10);
    }

}
