pragma solidity ^0.8.0;

contract PeerXDAO {
    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        address proposer;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping(address => uint256) public votingPower;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 proposalId, string description, address proposer);
    event Voted(uint256 proposalId, address voter, bool support);
    event ProposalExecuted(uint256 proposalId);

    modifier onlyTokenHolder() {
        require(votingPower[msg.sender] > 0, "Only token holders can participate");
        _;
    }

    function createProposal(string memory description) external onlyTokenHolder {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            executed: false,
            proposer: msg.sender
        });
        emit ProposalCreated(proposalCount, description, msg.sender);
    }

    function vote(uint256 proposalId, bool support) external onlyTokenHolder {
        Proposal storage proposal = proposals[proposalId];
        require(!hasVoted[proposalId][msg.sender], "Already voted on this proposal");
        require(!proposal.executed, "Proposal already executed");

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposal.votesFor += votingPower[msg.sender];
        } else {
            proposal.votesAgainst += votingPower[msg.sender];
        }

        emit Voted(proposalId, msg.sender, support);
    }

    function executeProposal(uint256 proposalId) external onlyTokenHolder {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal did not pass");

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function assignVotingPower(address user, uint256 power) external {
        // This function can be restricted to admin or based on PXNM token balances in real implementation
        votingPower[user] = power;
    }
}
