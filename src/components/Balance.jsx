import {Box} from '@material-ui/core';
import {ethers} from 'ethers';
import mainCinfig from '../config';
import {useContext, useEffect, useState} from "react";
import {WalletContext} from "../WalletContext";

export default function Balance() {
    const ethersConfig = mainCinfig.ethers;
    const provider = ethers.getDefaultProvider('homestead', ethersConfig);
    const [balance, setBalance] = useState('0');
    const { walletAddress } = useContext(WalletContext);

    useEffect(() => {
        async function fetchBalance() {
            if (walletAddress && walletAddress.length) {
                const walletBalance = await provider.getBalance(walletAddress);
                const formattedBalance = ethers.formatEther(walletBalance);

                setBalance(String(parseFloat(formattedBalance).toFixed(3)));
            } else {
                setBalance('0');
            }
        }

        fetchBalance();
    }, [provider, walletAddress]);

    return (
        <Box className={'MuiButton-root'} sx={{display: 'inline'}}>
            ETH: {balance}
        </Box>
    )
}
