import { useWeb3Modal, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react'
import {Button, Box} from '@material-ui/core';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import {useCallback} from "react";


export default function ConnectButton() {
    const { open } = useWeb3Modal();
    const {address, isConnected} = useWeb3ModalAccount();
    const {disconnect} = useDisconnect();

    const onClick = useCallback(() =>  isConnected ? disconnect() : open(),[isConnected, open, disconnect]);

    return (
        <Button onClick={onClick} startIcon={<AccountBalanceWallet />}>
            {isConnected ? address : 'Connect wallet'}
        </Button>
    )
}
