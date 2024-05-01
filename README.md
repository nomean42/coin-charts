# coin-charts
Coin explorer and history charts

# Getting Started

First of all you should install all packages

### `npm install`

After configure api keys for data providers:
Change .env or src/config.mjs

for [WalletConnect](https://docs.walletconnect.com/advanced/providers/universal):
WALLET_CONNECT_PROJECT_ID / walletConnect.projectId
WALLET_CONNECT_PROJECT_URL / walletConnect.url

for [Infura](https://docs.infura.io/api)
ETHERS_INFURA_KEY / ethers.infura


for [Alchemy](https://docs.alchemy.com/)
ETHERS_ALCHEMY_KEY / ethers.alchemy

for [Etherscan](https://docs.etherscan.io/)
ETHERS_ETHERSCAN_KEY / ethers.etherscan

NOTE: you can use only one or all of providers (ETHERS_* / ethers.*)

for [Coingecko](https://www.coingecko.com/en/api)
COINGECKO_API_KEY / coinGecko.apiKey

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
