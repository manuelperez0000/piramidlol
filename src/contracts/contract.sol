// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface Interface {
    event deposit(uint indexed id);
}

contract Piramid is Interface {

    address payable comisionsWallet;
    uint internal multiplier = 14;

    constructor () payable {
        comisionsWallet = payable(msg.sender);
    }

    uint public coversId1 = 0;
    bool public prev1 = false;
    address payable public investor1;
    address payable public nextToCollect1;
    mapping(uint => address payable) public covers1;
    mapping(address => uint) public getId1;

    uint public coversId2 = 0;
    bool public prev2 = false;
    address payable public investor2;
    address payable public nextToCollect2;
    mapping(uint => address payable) public covers2;
    mapping(address => uint) public getId2;

    uint public coversId3 = 0;
    bool public prev3 = false;
    address payable public investor3;
    address payable public nextToCollect3;
    mapping(uint => address payable) public covers3;
    mapping(address => uint) public getId3;

    mapping(address => uint8) public permisions;

    uint public price1 =   200*10**multiplier;
    uint public reguard1 = 340*10**multiplier;
    uint public comision1 = price1*2-reguard1;

    uint public price2 =   340*10**multiplier;
    uint public reguard2 = 612*10**multiplier;
    uint public comision2 = price2*2-reguard2;

    uint public price3 =   612*10**multiplier;
    uint public reguard3 = 116*10**multiplier;
    uint public comision3 = price3*2-reguard3;

    function pool1() public payable returns(bool){
        require(msg.value == price1,"Invalid amount to deposit");
        if(prev1 == false && coversId1 == 0){
            comisionsWallet.transfer(msg.value);
            coversId1 = 1;
            covers1[1] = payable(msg.sender);
            getId1[msg.sender] = coversId1+1;
            nextToCollect1 = payable(msg.sender);
        }else {
            if(!prev1){
                investor1 = payable(msg.sender);
                prev1 = true;
                getId1[msg.sender] = coversId1+1;
            }else{
                covers1[coversId1].transfer(reguard1); 
                comisionsWallet.transfer(comision1);
                nextToCollect1 = investor1;
                investor1 = payable(msg.sender);
                prev1 = false;
                covers1[coversId1+1] = payable(investor1);
                covers1[coversId1+2] = payable(msg.sender);
                coversId1 = coversId1+2;
                getId1[msg.sender] = coversId1+1;
            }
        }
        if(permisions[msg.sender] == 0 ) permisions[msg.sender] = 1;
        uint id = coversId1;
        emit deposit(id);
        return true;
    }

    function pool2() public payable returns (bool){
        require(permisions[msg.sender] > 0,"You don heve permisions");
        require(msg.value == price2,"Invalid amount to deposit");
        if(prev2 == false && coversId2 == 0){
           comisionsWallet.transfer(msg.value);
            coversId2 = 1;
            covers2[1] = payable(msg.sender);
            nextToCollect2 = payable(msg.sender);
            getId2[msg.sender] = coversId2+1;
        }else {

            if(!prev2){
                investor2 = payable(msg.sender);
                prev2 = true;
                getId2[msg.sender] = coversId2+1;
            }else{
                covers2[coversId2].transfer(reguard2); 
                comisionsWallet.transfer(comision2);
                nextToCollect2 = investor2;
                investor2 = payable(msg.sender);
                prev2 = false;
                covers2[coversId2+1] = investor2;
                covers2[coversId2+2] = payable(msg.sender);
                coversId2 = coversId2+2;
                getId2[msg.sender] = coversId2+1;
            }
        }
        permisions[msg.sender] = permisions[msg.sender] + 1;
        uint id = coversId2;
        emit deposit(id);
        return true;
    }

    function pool3() public payable returns (bool){
        require(permisions[msg.sender] > 1,"You don heve permisions");
        require(msg.value == price3,"Invalid amount to deposit");
        if(prev3 == false && coversId3 == 0){
            comisionsWallet.transfer(msg.value);
            coversId3 = 1;
            covers3[1] = payable(msg.sender);
            nextToCollect3 = payable(msg.sender);
            getId3[msg.sender] = coversId3+1;
        }else {

            if(!prev3){
                investor3 = payable(msg.sender);
                prev3 = true;
                getId3[msg.sender] = coversId3+1;
            }else{
                covers3[coversId3].transfer(reguard3); 
                comisionsWallet.transfer(comision3);
                nextToCollect3 = investor3;
                investor3 = payable(msg.sender);
                prev3 = false;
                covers3[coversId3+1] = investor3;
                covers3[coversId3+2] = payable(msg.sender);
                coversId3 = coversId3+2;
                getId3[msg.sender] = coversId3+1;
            }
        }
        uint id = coversId3;
        emit deposit(id);
        return true;
    }
}