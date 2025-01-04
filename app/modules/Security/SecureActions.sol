pragma solidity ^0.8.0;

contract SecureActions {
    address public owner;

    event ActionAuthorized(address indexed user, bytes32 actionHash);

    constructor() {
        owner = msg.sender;
    }

    function verifyAction(
        bytes32 actionHash,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 ethSignedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", actionHash)
        );
        return recoverSigner(ethSignedHash, signature) == owner;
    }

    function recoverSigner(
        bytes32 ethSignedHash,
        bytes memory signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        return ecrecover(ethSignedHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function authorizeAction(bytes32 actionHash, bytes memory signature) public {
        require(verifyAction(actionHash, signature), "Unauthorized action");
        emit ActionAuthorized(msg.sender, actionHash);
    }
}
