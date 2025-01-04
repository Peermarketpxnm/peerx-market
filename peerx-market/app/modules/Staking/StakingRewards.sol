pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StakingRewards {
    using SafeERC20 for IERC20;

    IERC20 public rewardsToken;
    IERC20 public stakingToken;

    uint public rewardRate = 100; // Reward rate per block (example value)
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;

    uint private _totalSupply;
    mapping(address => uint) private _balances;

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    function stake(uint _amount) external {
        _totalSupply += _amount;
        _balances[msg.sender] += _amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
        updateReward(msg.sender);
    }

    function withdraw(uint _amount) external {
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;
        stakingToken.safeTransfer(msg.sender, _amount);
        updateReward(msg.sender);
    }

    function claimReward() external {
        updateReward(msg.sender);
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        rewardsToken.safeTransfer(msg.sender, reward);
    }

    function updateReward(address account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] += earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
    }

    function rewardPerToken() public view returns (uint) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + ((block.timestamp - lastUpdateTime) * rewardRate / _totalSupply);
    }

    function earned(address account) public view returns (uint) {
        return (_balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18 + rewards[account];
    }
}
