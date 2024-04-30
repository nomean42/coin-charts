import logo from './logo512.png';
import './App.css';
import ConnectButton from './components/ConnectButton';
import { Box, Button, AppBar, Toolbar, ThemeProvider, createTheme, Avatar } from '@material-ui/core';
import { createWeb3Modal } from '@web3modal/ethers/react'
import walletConnectConfig from "./walletConnectConfig";


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
                color: '#106774',
                borderRadius: '5vh',
                border: '0.1vh solid #106774'
            }
        }
    }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
        <AppBar position="static">
            <Toolbar variant='regular'>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Avatar src={logo} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'flex-end'}}>
                        <ConnectButton />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    </ThemeProvider>
  );
}


export default App;
