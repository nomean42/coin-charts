import { defaultConfig } from '@web3modal/ethers/react';
import mainConfig from './config';

const {walletConnect: {projectId, url, icons}} = mainConfig;

const mainnet = {
	chainId: 1,
	name: 'Ethereum',
	currency: 'ETH',
	explorerUrl: 'https://etherscan.io',
	rpcUrl: 'https://cloudflare-eth.com'
};

const metadata = {
	name: 'Coins chart',
	description: 'Coin explorer and history charts',
	url,
	icons
};

const ethersConfig = defaultConfig({
	metadata,
	enableEIP6963: true, // true by default
	enableInjected: true, // true by default
	enableCoinbase: true, // true by default
	rpcUrl: '...', // used for the Coinbase SDK
	defaultChainId: 1, // used for the Coinbase SDK
});

const config = {
	ethersConfig,
	chains: [mainnet],
	projectId
};

export default config;
