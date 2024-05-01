import {Box} from '@material-ui/core';
import {ethers} from 'ethers';
import mainCinfig from '../config';
import {useContext, useEffect, useState} from "react";
import ERC20_ABI from "../erc20.abi.json";
import {WalletContext} from "../WalletContext";

export default function WalletBalance({contract, symbol}) {
	const ethersConfig = mainCinfig.ethers;
	const provider = ethers.getDefaultProvider('homestead', ethersConfig);

	const [balance, setBalance] = useState('0');
	const { walletAddress } = useContext(WalletContext);

	useEffect(() => {
		async function fetchBalance() {
			if (contract && walletAddress && walletAddress.length) {
				const erc20 = new ethers.Contract(contract, ERC20_ABI, provider);
				const walletBalance = await erc20.balanceOf(walletAddress)
				const formattedBalance = ethers.formatEther(walletBalance);

				setBalance(String(parseFloat(formattedBalance).toFixed(3)));
			} else {
				setBalance('0');
			}
		}

		fetchBalance();
	}, [provider, walletAddress, contract]);

	return (
		<Box className={'MuiButton-root'} sx={{display: 'inline'}}>
			{symbol && balance ? `${symbol.toUpperCase()}: ${balance}` : 0}
		</Box>
	)
}
