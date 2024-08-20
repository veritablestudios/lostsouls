// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4; // set version to match with waht we have in our hardhat configuration 
 
// Using ERC721 standard 
// Functionality we can use 
import "@openzeppelin/contracts/utils/Counters.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
 
import "hardhat/console.sol"; 
 
contract NFTMarketplace is ERC721URIStorage { 
    using Counters for Counters.Counter; 
 
    Counters.Counter private _tokenIds; 
    Counters.Counter private _itemsSold; 
 
    uint256 listingPrice = 0.00025 ether; 
 
    address payable owner; 
 
    mapping(uint256 => MarketItem) private idToMarketItem; 
 
    struct MarketItem { 
        uint256 tokenId;  
        address payable seller; 
        address payable owner; 
        uint256 price; 
        bool sold; 
    } 
    event MarketItemCreated( 
        uint256 indexed tokenId, 
        address seller, 
        address owner, 
        uint256 price, 
        bool sold 
    ); 

    constructor() ERC721("Lost Souls", "SOUL") { 
        owner = payable(msg.sender); 
    } 
 
    function createToken( 
        string memory tokenURI, 
        uint256 price 
    ) public payable returns (uint) { 
        _tokenIds.increment(); 
        uint256 newTokenId = _tokenIds.current(); 
        _mint(msg.sender, newTokenId); 
        _setTokenURI(newTokenId, tokenURI); 
 
        createMarketItem(newTokenId, price); 
        return newTokenId; 
    } 
} 
