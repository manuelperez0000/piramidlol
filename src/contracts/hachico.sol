// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract jachi {
    uint public ticket = 0;
    address payable owner;
    address payable public lastWiner;
    uint randNonce = 0;
    mapping(uint => address payable) public players;
    uint winersId = 0;
    mapping(uint => address) public winers;
    uint public ronda = 1;
    uint price = 1100000000000000000;

    constructor () payable {
        owner = payable(msg.sender);
    }

    function random() public view returns(uint) {
        return  uint(keccak256(abi.encodePacked(block.number,block.timestamp,block.difficulty,block.gaslimit,msg.sender, randNonce))) % 10;
    }

    function beats() public payable returns (uint){
        require(msg.value == price,"Error: Icorrect ammount");
        randNonce++;
        if(ticket < 9){
            ticket++;
            players[ticket] = payable(msg.sender);
            return 0;
        }else{
            uint rand = random()+1;
            address win = players[rand];
            payable(win).transfer(10000000000000000000);
            payable(owner).transfer(1000000000000000000);
            ticket = 0;
            lastWiner = payable(win);
            winersId++;
            winers[winersId] = win;
            ronda++;
            return rand;
        }
    }

    function balance() public view returns(uint){
        return address(this).balance;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function changePrice(uint _price) public onlyOwner{
        require(msg.sender == owner, "Not owner");
        price = _price;
    }

    function withdraw(uint amount) public onlyOwner returns(bool){
        require(msg.sender == owner, "Not owner");
        (bool success,) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
        return true;
    }

    function changeOwner (address payable newOwner) public onlyOwner returns(bool){
        require(msg.sender == owner, "Not owner");
        owner = newOwner;
        return true;
    }

}
//0x3616580C494b1734657E575d60398dd0E48F21A2
/*-
[
	{
		"inputs": [],
		"name": "beats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "changePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastWiner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "random",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ronda",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticket",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "winers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
*/