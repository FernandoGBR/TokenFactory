pragma solidity >=0.5.0;

contract Owned{
    address public owner;

    modifier onlyOwner(){
        require (msg.sender == owner, "only owner can call this");
        _;
    }

    constructor() public{
        owner = msg.sender;
    }   
}