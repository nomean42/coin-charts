const fs = require('fs');
const path = require('path');
const pathToConfig = path.resolve(__dirname, 'src/config.mjs');
const originalConfig = import(pathToConfig);

const parseEnvValue = (val) => {
	const str = String(val);
	if (str.length) {
		return str;
	} else {
		return null;
	}
}

originalConfig.then(({default: def}) => {
	const mainConfig = {
		walletConnect: {
			projectId: def.walletConnect.projectId || parseEnvValue(process.env['WALLET_CONNECT_PROJECT_ID']) || '',
			url: def.walletConnect.url || parseEnvValue(process.env['WALLET_CONNECT_PROJECT_URL']) || ''
		},
		coinGecko: {
			apiKey: def.coinGecko.apiKey || parseEnvValue(process.env['COINGECKO_API_KEY']) || ''
		},
		ethers: {
			infura: def.ethers.infura || parseEnvValue(process.env['ETHERS_INFURA_KEY']) || '',
			alchemy: def.ethers.alchemy || parseEnvValue(process.env['ETHERS_ALCHEMY_KEY']) || '',
			etherscan: def.ethers.etherscan || parseEnvValue(process.env['ETHERS_ETHERSCAN_KEY']) || ''
		}
	}

	const configString = `const m=${JSON.stringify(mainConfig)}; export default m;`;

	fs.writeFileSync(pathToConfig, configString);
})

