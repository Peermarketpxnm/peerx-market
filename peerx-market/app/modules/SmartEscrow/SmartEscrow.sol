pragma solidity ^0.8.0;

contract SmartEscrow {
    enum EscrowStatus { PENDING, COMPLETED, DISPUTED }
    
    struct Escrow {
        address buyer;
        address seller;
        uint256 amount;
        EscrowStatus status;
    }

    mapping(uint256 => Escrow) public escrows;
    uint256 public escrowCount;
    address public mediator; // Address of the mediator for dispute resolution

    event EscrowCreated(uint256 escrowId, address buyer, address seller, uint256 amount);
    event EscrowCompleted(uint256 escrowId);
    event EscrowDisputed(uint256 escrowId);
    event EscrowResolved(uint256 escrowId, address winner);

    modifier onlyMediator() {
        require(msg.sender == mediator, "Only mediator can perform this action");
        _;
    }

    constructor(address _mediator) {
        mediator = _mediator;
    }

    function createEscrow(address _seller) external payable {
        require(msg.value > 0, "Escrow amount must be greater than zero");
        escrowCount++;
        escrows[escrowCount] = Escrow(msg.sender, _seller, msg.value, EscrowStatus.PENDING);
        emit EscrowCreated(escrowCount, msg.sender, _seller, msg.value);
    }

    function completeEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.buyer, "Only buyer can complete the escrow");
        require(escrow.status == EscrowStatus.PENDING, "Escrow is not in PENDING status");

        escrow.status = EscrowStatus.COMPLETED;
        payable(escrow.seller).transfer(escrow.amount);
        emit EscrowCompleted(_escrowId);
    }

    function disputeEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.seller,
            "Only buyer or seller can dispute the escrow"
        );
        require(escrow.status == EscrowStatus.PENDING, "Escrow is not in PENDING status");

        escrow.status = EscrowStatus.DISPUTED;
        emit EscrowDisputed(_escrowId);
    }

    function resolveEscrow(uint256 _escrowId, address _winner) external onlyMediator {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.status == EscrowStatus.DISPUTED, "Escrow is not in DISPUTED status");

        escrow.status = EscrowStatus.COMPLETED;
        payable(_winner).transfer(escrow.amount);
        emit EscrowResolved(_escrowId, _winner);
    }
}
