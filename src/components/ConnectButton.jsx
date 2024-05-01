import { useWeb3Modal, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react'
import {Button, Box} from '@material-ui/core';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import {useCallback, useContext, useEffect} from "react";
import {WalletContext} from "../WalletContext";


export default function ConnectButton() {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useWeb3ModalAccount();
    const { disconnect } = useDisconnect();
    const { setWalletAddress } = useContext(WalletContext);
    useEffect(() => {setWalletAddress(address)}, [address, setWalletAddress]);

    const onClick = useCallback(() =>  isConnected ? disconnect() : open(),[isConnected, open, disconnect]);

    return (
        <Button onClick={onClick} startIcon={<AccountBalanceWallet />}>
            <Box sx={{maxWidth: '15vh', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'left'}}>
                {isConnected ? address : 'Connect'}
            </Box>
        </Button>
    )
}
