pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    address private immutable pxnmToken;
    address private immutable routerAddress;
    IUniswapV2Router02 private immutable router;

    constructor(address _pxnmToken, address _routerAddress) {
        pxnmToken = _pxnmToken;
        routerAddress = _routerAddress;
        router = IUniswapV2Router02(_routerAddress);
    }

    function swapPXNMForETH(uint256 amountIn, uint256 amountOutMin, address to) external {
        IERC20(pxnmToken).transferFrom(msg.sender, address(this), amountIn);
        IERC20(pxnmToken).approve(routerAddress, amountIn);

        address[] memory path = new address[](2);
        path[0] = pxnmToken;
        path[1] = router.WETH();

        router.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            to,
            block.timestamp + 300
        );
    }
}
