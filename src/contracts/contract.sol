// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Piramid {

    uint public coversId = 0;
    bool public prev = false;
    address public investor;
    address public nextToCollect;

    mapping(uint => address) public covers;

    uint public price =   20000000000000000;
    uint public reguard = 35000000000000000;
    uint public comision = 5000000000000000;
    address public comisionsWallet = 0x40019cE6335902C92bD7f054FDE97fF419E7E3DE;

    function depsit() public payable{
        if(prev == false && coversId == 0){
            coversId = 1;
            covers[1] = msg.sender;
            nextToCollect = msg.sender;
        }else {
            require(msg.value == price,"Invalid amount to deposit");

            if(!prev){
                investor = msg.sender;
                prev = true;
            }else{
                (bool success,) = covers[coversId].call{value: reguard}("");
                require(success, "Failed to send Ether to user");
                (bool success2,) = comisionsWallet.call{value: comision}("");
                require(success2, "Failed to send Ether to comision");
                nextToCollect = investor;
                investor = msg.sender;
                prev = false;
                covers[coversId+1] = investor;
                covers[coversId+2] = msg.sender;
                coversId = coversId+2;
            }
        }
    }
    
}