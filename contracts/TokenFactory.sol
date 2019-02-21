pragma solidity >=0.5.0;

import "./Owned.sol";
import "./TokenList.sol";
import "./Token.sol";

contract TokenFactory is Owned{    
    mapping (address => bool) canCreateToken;
    TokenList tokenList;

    constructor () public {
        tokenList = new TokenList();
    }

    function createToken(
        uint256 initialSupply,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) public {
        //TODO comprobaciones derivadas de nuestro modelo de negocio i.e. (decimals <= n)
        require(canCreateToken[msg.sender], "Sender can not create token");

        TokenERC20 token = new TokenERC20(initialSupply, _name, _symbol, _decimals, msg.sender);
        tokenList.addToken(address(token));        
    }

    /** 
    Lo llamamos nosotros con la direccion del futuro creador para dar permiso a la creacion
    */
    function allowCreateToken(address creator) public onlyOwner {
        require(!canCreateToken[creator], "Already can create token");
        canCreateToken[creator] = true;       
    }

    /** 
    Devuelve la lista completa de direcciones de tokens creados
    */
    function getAllTokens() public view onlyOwner returns (address[] memory addressList){
        addressList = tokenList.getAllTokens();
    }
}