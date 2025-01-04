# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# PeerXMarket - Stage 1: Initial Setup

This stage includes the basic foundation of the PeerXMarket platform:

- A Solidity smart contract for managing products and purchases using Ethereum.
- React Native app with WalletConnect integration for interacting with the blockchain.

## Features

1. List products with name, description, and price.
2. Buy products using ETH.

## Installation

### Prerequisites

- Node.js and npm installed.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Solidity development tools (e.g., Remix or Hardhat).

### Steps

1. Clone the repository and navigate to this stage's directory.
2. Install dependencies for the app:
   ```bash
   npm install
   ```
3. Deploy the smart contract:
   - Use Remix IDE or Hardhat to deploy the `PeerXMarket.sol` contract.
   - Copy the deployed contract address into the `App.js` file.
4. Start the React Native app:
   ```bash
   expo start
   ```
5. Connect your wallet (e.g., MetaMask) using WalletConnect.

## Notes

- The contract address needs to be updated in `App.js` after deployment.
- Test the app by listing and buying products.

# PeerXMarket - Stage 2: Cryptocurrency Conversion to PXNM

This stage introduces the functionality for converting cryptocurrencies (e.g., ETH, USDT) into PXNM tokens using a decentralized exchange (DEX) like Uniswap.

## Features

1. Conversion of supported cryptocurrencies into PXNM.
2. Automatic fetching of real-time exchange rates from the DEX.

## Installation

### Prerequisites

- Ensure the Stage 1 setup is complete and functioning.
- Deploy the provided `PXNMToken.sol` smart contract.

### Steps

1. Deploy `PXNMToken.sol` using Remix or Hardhat.
   - This contract creates a basic ERC20 token (PXNM) for the marketplace.
2. Install the required dependencies for DEX interaction:
   ```bash
   npm install @uniswap/sdk ethers
   ```
3. Update the deployed contract address in the app's `App.js`.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure liquidity is added for the PXNM token on Uniswap to enable trading.
- Test the conversion functionality with small amounts of cryptocurrency.

# PeerXMarket - Stage 3: Decentralized Storage with IPFS

This stage introduces decentralized storage using IPFS for product images and descriptions.

## Features

1. Upload product images and descriptions to IPFS.
2. Retrieve and display stored data in the app.

## Installation

### Prerequisites

- Ensure the Stage 1 and Stage 2 setups are complete.
- Install IPFS dependencies for the app:
  ```bash
  npm install ipfs-http-client
  ```

### Steps

1. Set up an IPFS node or use a public IPFS gateway (e.g., Infura).
2. Update the `App.js` file with your IPFS endpoint details.
3. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure the IPFS CID is stored on-chain for retrieval during product listing.
- Test the upload and retrieval processes with sample data.

# PeerXMarket - Stage 4: Staking and Rewards

This stage introduces staking functionality for PXNM tokens, allowing users to lock their tokens and earn rewards.

## Features

1. Staking PXNM tokens to earn rewards.
2. Display of user balances and staking rewards.

## Installation

### Prerequisites

- Ensure the Stage 1, 2, and 3 setups are complete.
- Deploy the `StakingRewards.sol` smart contract.

### Steps

1. Deploy `StakingRewards.sol` using Remix or Hardhat.
   - Use the deployed PXNM token address as a parameter for the staking contract.
2. Install dependencies for interacting with the staking contract:
   ```bash
   npm install ethers
   ```
3. Update the contract address in the app's `App.js` file.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure the rewards distribution is configured in the staking contract.
- Test the staking and rewards withdrawal with different accounts.

# PeerXMarket - Stage 5: Reputation and Reviews

This stage introduces a reputation and review system for sellers and products.

## Features

1. Users can leave reviews and ratings for products after purchase.
2. Sellers accumulate a reputation score based on their ratings.

## Installation

### Prerequisites

- Ensure the Stage 1, 2, 3, and 4 setups are complete.
- Deploy the `ReputationSystem.sol` smart contract.

### Steps

1. Deploy `ReputationSystem.sol` using Remix or Hardhat.
2. Install necessary dependencies for interacting with the contract:
   ```bash
   npm install ethers
   ```
3. Update the contract address in the app's `App.js` file.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure users can only leave reviews for products they have purchased.
- Test the review and reputation system with multiple accounts.

# PeerXMarket - Stage 6: Real-Time Notifications and Updates

This stage introduces real-time notifications for the app, keeping users updated about new products, order status, and other events.

## Features

1. Real-time notifications for new products and order updates.
2. Integration with a WebSocket-based backend.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 5 setups are complete.
- Set up a WebSocket server for handling notifications.

### Steps

1. Install necessary dependencies for WebSocket communication:
   ```bash
   npm install socket.io-client
   ```
2. Start the WebSocket server (code included in this stage).
3. Update the WebSocket server URL in the app's `App.js` file.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure the WebSocket server is running and accessible.
- Test notifications by simulating events on the server.

# PeerXMarket - Stage 7: Advanced Filtering and Search

This stage introduces advanced filtering and search functionality for the marketplace.

## Features

1. Search for products by name, category, price range, and location.
2. Dynamic filtering for better user experience.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 6 setups are complete.
- Backend support for product data queries (optional).

### Steps

1. Ensure the product data includes fields for filtering (e.g., category, price, location).
2. Update the app's `App.js` file with the filtering and search logic.
3. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the search and filter functionality with different datasets.
- Ensure the filters dynamically update the displayed products.

# PeerXMarket - Stage 8: Light/Dark Mode Toggle

This stage introduces a light and dark mode toggle for the app, enhancing user experience with customizable themes.

## Features

1. Toggle between light and dark themes.
2. Persist the selected theme using local storage.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 7 setups are complete.

### Steps

1. Update the app's `App.js` file with the light/dark mode toggle logic.
2. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the toggle functionality and ensure the theme persists across sessions.
- Customize the themes to align with your brand.

# PeerXMarket - Stage 9: Multi-Chain and Multi-Cryptocurrency Support

This stage introduces support for multiple blockchains and cryptocurrencies, enabling users to interact with tokens from various networks.

## Features

1. Detect and switch between supported blockchains (e.g., Ethereum, Binance Smart Chain, Polygon).
2. Handle multiple cryptocurrencies (ETH, BNB, MATIC, etc.) for transactions.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 8 setups are complete.
- Wallets (e.g., MetaMask) configured for multi-chain support.

### Steps

1. Install necessary dependencies for blockchain interaction:
   ```bash
   npm install ethers
   ```
2. Update the app's `App.js` file with multi-chain logic.
3. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test transactions on different chains using testnets.
- Ensure token addresses are correctly configured for each chain.

# PeerXMarket - Stage 10: Security and Auditing with Digital Signatures

This stage introduces enhanced security features, including digital signatures for critical actions and auditing best practices.

## Features

1. Use of digital signatures to verify transactions and critical user actions.
2. Best practices for contract security and auditing.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 9 setups are complete.
- Deploy the `SecureActions.sol` smart contract.

### Steps

1. Deploy `SecureActions.sol` using Remix or Hardhat.
2. Install necessary dependencies for signing and verifying actions:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with digital signature logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test signature verification with multiple users.
- Review the contract for security vulnerabilities before deploying to mainnet.

# PeerXMarket - Stage 11: Gamification and Rewards System

This stage introduces gamification features to increase user engagement through achievements and rewards.

## Features

1. User achievements based on activities (e.g., frequent sales, positive reviews).
2. Rewards system tied to achievements.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 10 setups are complete.
- Deploy the `Gamification.sol` smart contract.

### Steps

1. Deploy `Gamification.sol` using Remix or Hardhat.
2. Install necessary dependencies for interacting with the contract:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with gamification logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test achievement tracking with various user activities.
- Customize rewards to align with platform goals.

# PeerXMarket - Stage 12: PXNM Conversion to External Cryptocurrencies

This stage enables the automatic conversion of PXNM tokens to external cryptocurrencies, such as ETH, BNB, or MATIC.

## Features

1. Swap PXNM for other cryptocurrencies via decentralized exchanges (e.g., Uniswap, PancakeSwap).
2. Fetch real-time conversion rates for a seamless experience.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 11 setups are complete.
- Deploy the `TokenSwap.sol` smart contract.

### Steps

1. Deploy `TokenSwap.sol` using Remix or Hardhat.
2. Install necessary dependencies for interacting with the swap logic:
   ```bash
   npm install @uniswap/sdk ethers
   ```
3. Update the app's `App.js` file with token swap logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test token swaps on different DEX testnets.
- Ensure sufficient liquidity for PXNM pairs in the target exchange.

# PeerXMarket - Stage 13: NFT Integration

This stage introduces NFT functionality, enabling users to mint, buy, and sell NFTs directly on the PeerXMarket platform.

## Features

1. Mint NFTs with customizable metadata (name, description, image).
2. Buy and sell NFTs on the marketplace.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 12 setups are complete.
- Deploy the `PeerXNFT.sol` smart contract.

### Steps

1. Deploy `PeerXNFT.sol` using Remix or Hardhat.
2. Install necessary dependencies for interacting with the NFT contract:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with NFT minting and trading logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Ensure the NFT metadata (e.g., images) is stored on IPFS or a similar decentralized storage solution.
- Test NFT minting and trading with multiple accounts.

# PeerXMarket - Stage 14: Fiat to Crypto Conversion

This stage enables users to deposit fiat currencies and automatically convert them into PXNM or supported cryptocurrencies.

## Features

1. Deposit fiat using payment gateways (e.g., MoonPay, Ramp Network).
2. Automated conversion of fiat to PXNM or other cryptos with minimal fees.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 13 setups are complete.
- Set up an account with a fiat-to-crypto on-ramp provider (e.g., MoonPay, Ramp, or Onramper).

### Steps

1. Configure the fiat gateway API key in the app's `App.js` file.
2. Ensure liquidity for PXNM pairs in target exchanges (e.g., Uniswap, PancakeSwap).
3. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test fiat deposits and conversion workflows with sandbox accounts.
- Ensure users are informed of any conversion fees.

# PeerXMarket - Stage 15: Analytics and Metrics

This stage introduces an analytics dashboard for administrators to monitor platform metrics, such as sales volume, transactions, and user activity.

## Features

1. Real-time tracking of sales and transactions.
2. Visualization of user activity and platform performance.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 14 setups are complete.
- Set up a backend server to aggregate metrics.

### Steps

1. Deploy the `AnalyticsServer.js` backend to a server or local environment.
2. Install the necessary dependencies for the analytics dashboard:
   ```bash
   npm install chart.js axios
   ```
3. Update the app's `App.js` file with analytics visualization logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the analytics dashboard with mock data before deploying.
- Ensure secure access to analytics for administrators only.

# PeerXMarket - Stage 16: Smart Escrow for Disputes

This stage introduces a smart escrow system to ensure secure transactions between buyers and sellers, with funds released only upon mutual agreement or mediation.

## Features

1. Smart contract-based escrow for holding funds.
2. Dispute resolution system integrated into the escrow.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 15 setups are complete.
- Deploy the `SmartEscrow.sol` smart contract.

### Steps

1. Deploy `SmartEscrow.sol` using Remix or Hardhat.
2. Install the necessary dependencies for integrating the escrow in the app:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with escrow logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the escrow flow (hold funds, release funds, raise disputes) with mock transactions.
- Ensure dispute resolutions are fair and verifiable.

# PeerXMarket - Stage 17: Premium Subscription System

This stage introduces a premium subscription system for users, offering exclusive benefits such as reduced fees, featured listings, and early access to features.

## Features

1. Purchase premium subscriptions using PXNM or other cryptocurrencies.
2. Manage subscription status and expiration dates.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 16 setups are complete.
- Deploy the `PremiumSubscription.sol` smart contract.

### Steps

1. Deploy `PremiumSubscription.sol` using Remix or Hardhat.
2. Install necessary dependencies for integrating the subscription logic:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with subscription purchase and management functionality.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the subscription flow (purchase, expiration) with multiple accounts.
- Customize subscription benefits to align with platform goals.

# PeerXMarket - Stage 18: Decentralized Autonomous Organization (DAO)

This stage introduces a governance system, allowing PXNM token holders to participate in decision-making through proposals and voting.

## Features

1. Create proposals to suggest platform changes.
2. Vote on proposals using PXNM tokens.

## Installation

### Prerequisites

- Ensure the Stage 1 through Stage 17 setups are complete.
- Deploy the `PeerXDAO.sol` smart contract.

### Steps

1. Deploy `PeerXDAO.sol` using Remix or Hardhat.
2. Install necessary dependencies for interacting with the DAO contract:
   ```bash
   npm install ethers
   ```
3. Update the app's `App.js` file with proposal and voting logic.
4. Run the app:
   ```bash
   expo start
   ```

## Notes

- Test the proposal and voting process with multiple accounts.
- Ensure the voting system aligns with PXNM token distribution.

# PeerXMarket - Stage 19: App Publishing and Optimization

This stage prepares the PeerXMarket app for publishing on the Google Play Store and Apple App Store, ensuring optimal performance and responsiveness.

## Features

1. Optimized app structure for mobile stores.
2. Steps to publish on Play Store and App Store.

## Installation and Setup

### Prerequisites

- Ensure the Stage 1 through Stage 18 setups are complete.
- Install Expo CLI if not already installed:
  ```bash
  npm install -g expo-cli
  ```

### Steps

#### 1. Optimize App for Stores

1. Ensure all dependencies are up to date:
   ```bash
   npm install
   ```
2. Test the app for performance and responsiveness using:
   ```bash
   expo start
   ```

#### 2. Build for Play Store and App Store

1. Run the following command to build the app:
   ```bash
   expo build:android
   expo build:ios
   ```
2. Follow the prompts to generate the APK (Android) and IPA (iOS) files.

#### 3. Submit to Stores

1. **Google Play Store**:
   - Create a developer account at [Google Play Console](https://play.google.com/console/).
   - Upload the APK file and complete the submission process.
2. **Apple App Store**:
   - Create a developer account at [Apple Developer](https://developer.apple.com/).
   - Use Transporter (macOS) to upload the IPA file and submit for review.

## Notes

- Ensure compliance with store guidelines for privacy, security, and user experience.
- Test extensively before submission to avoid rejection.
