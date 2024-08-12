// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4; // Specify the Solidity version

// Importing necessary contracts and libraries from OpenZeppelin
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol"; // For debugging purposes with Hardhat

// Define the NFTMarketplace contract that extends ERC721URIStorage
contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter; // Using Counters for managing token IDs and items sold

    Counters.Counter private _tokenIds; // Counter to keep track of token IDs
    Counters.Counter private _itemsSold; // Counter to track items sold

    uint256 listingPrice = 0.00025 ether; // Listing price for the marketplace

    address payable owner; // Address of the marketplace owner

    // Mapping to store MarketItems by their tokenId
    mapping(uint256 => MarketItem) private idToMarketItem;

    // Struct to define a MarketItem
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // Event to notify when a MarketItem is created
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // Constructor to initialize the contract with a name and symbol, and set the owner
    constructor() ERC721("Lost Souls", "SOUL") {
        owner = payable(msg.sender); // Setting the contract deployer as the owner
    }

    // Function to update the listing price (only owner can do this)
    function updateListingPrice(uint _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update the listing price"
        );
        listingPrice = _listingPrice;
    }

    // Function to get the current listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Function to create a new token and list it on the marketplace
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint) {
        _tokenIds.increment(); // Increment the token ID counter
        uint256 newTokenId = _tokenIds.current(); // Get the current token ID
        _mint(msg.sender, newTokenId); // Mint the new token
        _setTokenURI(newTokenId, tokenURI); // Set the token URI

        createMarketItem(newTokenId, price); // Create a market item for the token
        return newTokenId; // Return the new token ID
    }

    // Internal function to create a market item
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be aleast 0"); // Ensure price is greater than 0
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        // Create a new market item and map it by tokenId
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        // Transfer the token to the marketplace contract
        _transfer(msg.sender, address(this), tokenId);
        
        // Emit an event when the market item is created
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // Function to resell a token on the marketplace
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "You are not the owner of this token"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        // Update the market item details for reselling
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement(); // Decrement the items sold counter
        _transfer(msg.sender, address(this), tokenId); // Transfer the token back to the marketplace
    }

    // Function to purchase a token from the marketplace
    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        // Update the market item details after sale
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment(); // Increment the items sold counter

        _transfer(address(this), msg.sender, tokenId); // Transfer the token to the buyer

        payable(owner).transfer(listingPrice); // Transfer the listing fee to the marketplace owner
        payable(idToMarketItem[tokenId].seller).transfer(msg.value); // Transfer the sale amount to the seller
    }

    // Function to fetch all unsold market items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current(); // Get the total number of tokens created
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current(); // Calculate the number of unsold items
        uint currentIndex = 0;

        // Create an array to store unsold items
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; // Return the array of unsold items
    }

    // Function to fetch all NFTs owned by the caller
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Count the number of NFTs owned by the caller
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // Create an array to store the caller's NFTs
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; // Return the array of NFTs owned by the caller
    }

    // Function to fetch all items listed by the caller
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Count the number of items listed by the caller
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // Create an array to store the listed items
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; // Return the array of items listed by the caller
    }
}