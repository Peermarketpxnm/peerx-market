pragma solidity ^0.8.0;

contract ReputationSystem {
    struct Review {
        uint productId;
        address reviewer;
        uint8 rating;
        string comment;
    }

    mapping(uint => Review[]) public productReviews;
    mapping(address => uint) public sellerReputation;

    event ReviewSubmitted(uint productId, address reviewer, uint8 rating, string comment);

    function submitReview(uint _productId, address _seller, uint8 _rating, string memory _comment) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        productReviews[_productId].push(Review(_productId, msg.sender, _rating, _comment));
        sellerReputation[_seller] += _rating;
        emit ReviewSubmitted(_productId, msg.sender, _rating, _comment);
    }

    function getReviews(uint _productId) public view returns (Review[] memory) {
        return productReviews[_productId];
    }

    function getSellerReputation(address _seller) public view returns (uint) {
        return sellerReputation[_seller];
    }
}
