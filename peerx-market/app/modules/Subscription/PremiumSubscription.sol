pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PremiumSubscription {
    IERC20 public pxnmToken;
    uint256 public subscriptionFee; // Fee in PXNM tokens
    mapping(address => uint256) public subscriptions; // Expiration timestamp for each user

    event SubscriptionPurchased(address indexed user, uint256 expiration);

    constructor(address _pxnmToken, uint256 _subscriptionFee) {
        pxnmToken = IERC20(_pxnmToken);
        subscriptionFee = _subscriptionFee;
    }

    function purchaseSubscription(uint256 duration) external {
        uint256 totalFee = subscriptionFee * duration;
        pxnmToken.transferFrom(msg.sender, address(this), totalFee);

        if (subscriptions[msg.sender] < block.timestamp) {
            subscriptions[msg.sender] = block.timestamp + duration * 30 days;
        } else {
            subscriptions[msg.sender] += duration * 30 days;
        }

        emit SubscriptionPurchased(msg.sender, subscriptions[msg.sender]);
    }

    function isSubscribed(address user) public view returns (bool) {
        return subscriptions[user] > block.timestamp;
    }
}
