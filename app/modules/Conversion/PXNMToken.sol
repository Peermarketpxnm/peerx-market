pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PXNMToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("PeerXMarket Token", "PXNM") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
