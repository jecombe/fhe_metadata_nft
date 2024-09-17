// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EncryptedErc721 is Ownable, ERC721 {
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => mapping(uint256 => euint64)) internal eKeys;

    constructor(string memory name, string memory symbol) Ownable(msg.sender) ERC721(name, symbol) {}

    // Fonction pour récupérer la clé chiffrée
    function getKeys(uint256 tokenId) public view returns (euint64) {
        require(ownerOf(tokenId) == msg.sender, "ERC721: caller is not the owner of this token");
        return eKeys[msg.sender][tokenId];
    }

    // Fonction pour frapper un nouveau NFT
    function mint(address to, uint256 tokenId, string memory tokenURI, einput _eKey, bytes calldata inputProof) public {
        euint64 eKey = TFHE.asEuint64(_eKey, inputProof);
        eKeys[to][tokenId] = eKey;
        _setTokenURI(tokenId, tokenURI);
        _mint(to, tokenId);
    }

    // Fonction pour définir l'URI d'un token
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        // require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Fonction pour obtenir l'URI d'un token
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        //   require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}
