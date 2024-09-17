// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EncryptedErc721 is Ownable, ERC721 {
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => mapping(uint256 => euint64)) internal eKeys;

    constructor(string memory name, string memory symbol) Ownable(msg.sender) ERC721(name, symbol) {}

    function getKeys(uint256 tokenId) public view returns (euint64) {
        require(ownerOf(tokenId) == msg.sender, "ERC721: caller is not the owner of this token");
        return eKeys[msg.sender][tokenId];
    }

    function randomKeys() public returns (euint64) {
        return TFHE.randEuint64();
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory _UriToken,
        einput _eKey,
        bytes calldata inputProof
    ) public {
        euint64 eKey = TFHE.asEuint64(_eKey, inputProof);
        eKeys[to][tokenId] = eKey;
        _setTokenURI(tokenId, _UriToken, eKey);
        _mint(to, tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI, euint64 _eKey) internal {
        _tokenURIs[tokenId] = _tokenURI;
        eKeys[msg.sender][tokenId] = _eKey;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
