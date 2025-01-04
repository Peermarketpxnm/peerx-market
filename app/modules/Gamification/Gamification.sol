pragma solidity ^0.8.0;

contract Gamification {
    struct Achievement {
        string name;
        string description;
        uint reward;
    }

    mapping(address => Achievement[]) public userAchievements;
    mapping(address => uint) public userPoints;

    event AchievementUnlocked(address indexed user, string name, uint reward);

    function unlockAchievement(
        address user,
        string memory name,
        string memory description,
        uint reward
    ) public {
        userAchievements[user].push(Achievement(name, description, reward));
        userPoints[user] += reward;
        emit AchievementUnlocked(user, name, reward);
    }

    function getAchievements(address user) public view returns (Achievement[] memory) {
        return userAchievements[user];
    }

    function getPoints(address user) public view returns (uint) {
        return userPoints[user];
    }
}
