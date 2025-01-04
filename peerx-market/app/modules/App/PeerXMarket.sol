pragma solidity ^0.8.0;

contract PeerXMarket {
    struct Product {
        uint id;
        address payable seller;
        string name;
        string description;
        uint price;
        bool sold;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductListed(uint id, address seller, string name, uint price);
    event ProductPurchased(uint id, address buyer);

    function listProduct(string memory _name, string memory _description, uint _price) public {
        require(_price > 0, "Price must be greater than zero");
        productCount++;
        products[productCount] = Product(productCount, payable(msg.sender), _name, _description, _price, false);
        emit ProductListed(productCount, msg.sender, _name, _price);
    }

    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];
        require(product.id > 0 && product.id <= productCount, "Product not found");
        require(!product.sold, "Product already sold");
        require(msg.value >= product.price, "Not enough Ether to buy product");

        product.seller.transfer(product.price);
        product.sold = true;

        emit ProductPurchased(_id, msg.sender);
    }
}
