import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useHistory} from "react-router";
import {useConnectWallet} from "../../store/hooks/wallet";
import {DASHBOARD_PATH} from "../../config/routes";
import './Login.css';
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";

const Login = () => {

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const [loading,setLoading] = useState(true)


    const { connectAccount, connected } = useGlobalSettings()

    const { push } = useHistory();

    const {
        connectWallet,
        address,
        web3Modal,
        connected: connectedWallet,
        connectWalletPending
    } = useConnectWallet();


    const connectWalletModal = async () => {
        if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
            await connectWallet(web3Modal)
        }
    }

    useEffect(()=> {
        setLoading(false)
    },[])

    useEffect(() => {
        if (connected) {
            push(DASHBOARD_PATH)
        }
    }, [connected, push])


    useEffect(() => {

        if (connectedWallet) {
            connectAccount({address,connected: true})
        }
    }, [connectAccount, connectedWallet,address])



    if(loading){
        return <CircularProgress />
    }
    return (
        <Grid item xs={12} sm={12} md={6} style={{
            maxWidth: '100vw !important',
            top: matchesMd ? '' : '-50px',
            position: matchesMd ? '' : 'relative',
            zIndex: matchesMd ? '' : '1',
            backgroundColor: 'white',
            borderTopLeftRadius: '70px',
            borderTopRightRadius: '70px',
            height: matchesMd? '100vh' : 'calc( 100vh - 100px + 48px )',
            display:'grid'

        }}>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
                maxHeight={ matchesMd ? ' 100vh !important' : 'calc(100vh - 150px)!important' }
                style={{
                    maxWidth: '100vw !important',
                    paddingTop: matchesMd ? '' : 0,
                    height: matchesMd? '100vh':''
                }}>
                <Typography variant="h3" marginBottom={5}>
                    LAUT Portal
                </Typography>
                <Typography variant="h3" marginBottom={5}>
                    Log in
                </Typography>
                <Typography variant="body1" marginBottom={5}>
                    We never ask you to enter your private keys.
                </Typography>
                <Button
                    variant="contained"
                    style={{
                        minWidth: '150px',
                        alignSelf: 'center',
                        marginBottom: '12px',
                        height: '50px',
                        borderRadius: '30px',
                        fontSize: '1em',
                        background: '#00614b'
                    }}
                    disabled={connectWalletPending}
                    onClick={() => connectWalletModal()}
                >
                    Login
                </Button>
            </Box>
        </Grid>
    )
}

export default Login;
