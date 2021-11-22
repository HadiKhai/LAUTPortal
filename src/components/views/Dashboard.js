import React, {useEffect, useState} from 'react'
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Modal,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import {Redirect, useHistory, useLocation} from "react-router";
import {Route, Switch} from "react-router-dom";
import {AUTH_PATH, DASHBOARD_PATH, EXCHANGE_PATH, HISTORY_PATH, TRANSFER_PATH,} from "../../config/routes";
import {useConnectWallet, useDisconnectWallet} from "../../store/hooks/wallet";
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";
import {BSC} from "../../store/types/constants";
import ControlPanel from "../Dashboard/ControlPanel";
import Exchange from "../Dashboard/Exchange";
import './Dashboard.css'
import Marquee from "react-marquee-slider";
import Transfer from "../Dashboard/Transfer";

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f8f8f8',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const createPrice = (name,price)=> {
    return  (
        <div style={{height: '50px',display:'flex',placeItems:'center', paddingRight:'150px'}} >{name} {price}</div>
    )
}

const Dashboard = () => {

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const [error, setError] = useState('');

    const [open, setOpen] = useState(false);

    const { disconnectAccount, connected: globalConnected, changeAccountPending } = useGlobalSettings()

    const {web3, connected, networkId, web3Modal, connectWalletPending, connectWallet} = useConnectWallet();

    const {disconnectWallet, disconnectWalletPending} = useDisconnectWallet();

    const {push} = useHistory();

    const {pathname} = useLocation();

    const [value, setValue] = React.useState(
        () => {
            switch (pathname) {
                case DASHBOARD_PATH:
                    return 'dashboard';
                case EXCHANGE_PATH:
                    return 'exchange';
                default:
                    return 'dashboard'

            }
        }
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 'dashboard':
                push(DASHBOARD_PATH);
                break;
            case 'exchange':
                push(EXCHANGE_PATH);
                break;
            default:
                push(DASHBOARD_PATH);

        }
    };

    const handleClick = (path) => {
        push(path)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        disconnectAccount()
        if (web3) {
            await disconnectWallet(web3, web3Modal)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        (async () => {
            if (!globalConnected && !changeAccountPending) {
                push(AUTH_PATH)
            }

        })()

    }, [connected,globalConnected,connectWallet,push,web3Modal,changeAccountPending,disconnectWalletPending]);

    useEffect(() => {
        if (!connected && !web3Modal.cachedProvider) {
            disconnectWallet(web3, web3Modal)
        }
    }, [connected, web3Modal, disconnectWallet, web3, push])

    useEffect(() => {
        if (networkId !== BSC.networkId && connected) {
            setError(`Switch your wallet network to (${BSC.name})`)
        } else {
            setError('')
        }
    }, [networkId, connected ])

    useEffect(() => {
        (async () => {
            if (globalConnected) {
                await connectWallet(web3Modal)

            }
        })()
    },[globalConnected,web3Modal,connectWallet,connected])

    if (connectWalletPending || !globalConnected) {
        return (<div
            style={{display: 'flex', height: 'calc(100vh - 64px)', justifyContent: 'center', alignItems: 'center'}}>
            {/*<div style={{width: '100%'}}>*/}
            <CircularProgress/>
            {/*</div>*/}
        </div>)
    }

    return (
        <Box sx={{display: 'flex', backgroundColor: '#f8f8f8', paddingBottom: matchesMd ? '' : '66px'}} height="100%">
            <CssBaseline/>
            {
                matchesMd ?
                    <Box sx={{
                        width: '100%',
                        minWidth: 210,
                        maxWidth: 210,
                    }}
                    >
                        <Typography
                            variant='body2'
                            paddingX={5}
                            paddingTop={3}
                            paddingBottom={3}
                            style={{color: 'grey'}}
                        >
                            Dashboard Menu
                        </Typography>
                        <Divider sx={{marginRight: '24px', marginBottom: '10px'}}/>
                        <List style={{paddingLeft: '24px', paddingRight: '24px'}}>
                            <ListItem style={{marginBottom: '8px'}} disablePadding
                                      onClick={() => handleClick(DASHBOARD_PATH)}>
                                <ListItemButton selected={pathname === DASHBOARD_PATH}>
                                    <ListItemIcon>
                                        <DashboardIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{color:'#00614b'}} primary="Home"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem style={{marginBottom: '8px'}} disablePadding
                                      onClick={() => handleClick(EXCHANGE_PATH)}>
                                <ListItemButton selected={pathname === EXCHANGE_PATH}>
                                    <ListItemIcon>
                                        <SwapHorizIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{color:'#00614b'}}  primary="Exchange"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem style={{marginBottom: '8px'}} disablePadding
                                      onClick={() => handleClick(TRANSFER_PATH)}>
                                <ListItemButton selected={pathname === TRANSFER_PATH}>
                                    <ListItemIcon>
                                        <PeopleIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{color:'#00614b'}}  primary="Transfer"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem style={{marginBottom: '8px'}} disablePadding
                                      onClick={() => handleClick(HISTORY_PATH)}>
                                <ListItemButton selected={pathname === HISTORY_PATH}>
                                    <ListItemIcon>
                                        <HistoryIcon color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{color:'#00614b'}}  primary="History"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem style={{marginBottom: '8px'}} disablePadding onClick={handleOpen}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon color="error"/>
                                    </ListItemIcon>
                                    <ListItemText sx={{color: '#d32f2f'}} primary="Logout"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    :
                    <Paper sx={{
                        position: 'fixed',
                        height: '66px',
                        zIndex: 10,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxWidth: '100vw'
                    }} elevation={3}>
                        <BottomNavigation
                            showLabels
                            sx={{height: '66px'}}
                            value={value}
                            onChange={handleChange}
                        >
                            <BottomNavigationAction value="dashboard"
                                                    sx={{minWidth: 'unset !important', fontSize: '0.7em !important'}}
                                                    label="Home" icon={<DashboardIcon/>}/>
                            <BottomNavigationAction value="exchange"
                                                    sx={{minWidth: 'unset !important', fontSize: '0.7em !important'}}
                                                    label="Exchange" icon={<SwapHorizIcon/>}/>
                            <BottomNavigationAction value="transfer"
                                                    sx={{minWidth: 'unset !important', fontSize: '0.7em !important'}}
                                                    label="Transfer" icon={<PeopleIcon/>}/>
                            <BottomNavigationAction value="history"
                                                    sx={{minWidth: 'unset !important', fontSize: '0.7em !important'}}
                                                    label="History" icon={<HistoryIcon/>}/>
                        </BottomNavigation>
                    </Paper>
            }


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...modalStyle, width: 400}}>
                    <Box>
                        <h2 id="parent-modal-title">Do you really want to logout?</h2>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box>
                            <Button
                                style={{
                                    alignSelf: 'center',
                                    height: '30px',
                                    borderRadius: '30px',
                                    fontSize: '0.7em !important'
                                }}
                                variant="outlined"
                                onClick={handleClose}>Close</Button>
                        </Box>
                        <Box>
                            <Button
                                style={{
                                    alignSelf: 'center',
                                    height: '30px',
                                    borderRadius: '30px',
                                    fontSize: '0.7em !important'
                                }}
                                variant="outlined"
                                color="error"
                                onClick={handleLogout}>Logout</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Box flexDirection="column" component="main" sx={{
                display: 'flex', flexGrow: 1, padding: '24px 8px', minHeight: 'calc(100vh - 64px)',
                maxWidth: `${matchesMd ? 'calc(100vw - 210px )' : '100vw'}`
            }}>
                {error !== '' ?
                    <div style={{
                        textAlign: 'center',
                        backgroundColor: 'rgb(236,216,224)',
                        borderRadius: '2px',
                        padding: '8px',
                        margin: '8px',
                        height: 'fit-content'
                    }}>
                        <Typography variant='h5'>
                            {error}
                        </Typography>
                    </div>
                    : <></>
                }
                <div style={{
                    height: "50px",
                    background: 'linear-gradient(90deg, rgba(248,248,248,1) 0%, rgba(0,97,75,0.1) 5%, rgba(0,97,75,1) 30%, rgba(0,97,75,1) 70%, rgba(0,97,75,0.1)  95%, rgba(248,248,248,1) 100%)',
                    margin: '8px 0px',
                    minWidth: `${matchesMd ? 'calc( 100vw - 220px - 16px - 48px )' : 'calc( 100vw - 16px - 48px - 10px) '}`,
                    maxWidth: `${matchesMd ? 'calc( 100vw - 220px - 16px - 48px )' : 'calc( 100vw - 16px - 48px - 10px) '}`,
                    placeSelf: 'center'
                }}>
                    <Marquee velocity={70} resetAfterTries={200}>
                        {createPrice('BNB','530')}
                        {createPrice('ETH','4600')}
                        {createPrice('BTC','59020')}
                        {createPrice('LAUT','1')}
                    </Marquee>
                </div>
                { connected && !error ?
                <div style={{minWidth: `${matchesMd ? 'calc( 100vw - 220px - 16px)' : ''}`}}>
                    <Switch>
                        <Route exact path={DASHBOARD_PATH} component={ControlPanel}/>
                        <Route path={EXCHANGE_PATH} component={Exchange}/>
                        <Route path={TRANSFER_PATH} component={Transfer}/>
                        <Redirect to={DASHBOARD_PATH}/>
                    </Switch>
                </div>:
                    <CircularProgress />
                }
            </Box>
        </Box>
    )
}

export default Dashboard;
