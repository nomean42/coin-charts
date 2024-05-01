import logo from './logo512.png';
import './App.css';
import ConnectButton from './components/ConnectButton';
import Balance from './components/Balance';
import { Box, AppBar, Toolbar, ThemeProvider, createTheme, Avatar } from '@material-ui/core';
import { createWeb3Modal } from '@web3modal/ethers/react'
import walletConnectConfig from "./walletConnectConfig";
import {WalletContext} from './WalletContext';
import {useMemo, useState} from "react";
import Search from "./components/Search";


createWeb3Modal(walletConnectConfig);

const theme = createTheme({
    palette: {
        primary: {
            main: '#e6e6e6'
        }
    },
    overrides: {
        MuiButton: {
            root:{
                margin: '0 1vh',
                color: '#106774',
                borderRadius: '5vh',
                border: '0.1vh solid #106774',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
            },
            label: {
                padding: '0 1vh'
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: '1vh 1.5vh'
            }
        },
        MuiInputLabel: {
	        outlined: {
                transform: 'translate(1vh, 1.5vh) scale(1)'
            }
        },
        MuiList: {
            root: {
                position: 'absolute',
                top: '6vh'
            }
        }
    }
});


function App() {
    const [walletAddress, setWalletAddress] = useState('');
    const value = useMemo(() => ({ walletAddress, setWalletAddress }), [walletAddress]);

    return (
        <WalletContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar variant='regular'>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Box sx={{width: '33%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                <Avatar src={logo} />
                            </Box>
                            <Box sx={{width: '33%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Search />
                            </Box>
                            <Box sx={{ width: '33%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <ConnectButton />
                                <Balance />
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </WalletContext.Provider>
  );
}


export default App;
