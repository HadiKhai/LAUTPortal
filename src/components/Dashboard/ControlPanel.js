import React, {useEffect} from 'react'
import {Avatar, CircularProgress, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import Identicon from "identicon.js";
import './ControlPanel.css';
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";
import {useFetchBalance} from "../../store/hooks/contract/useFetchBalance";


const ControlPanel = () => {

    const theme = useTheme();


    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'));

    const {address} = useGlobalSettings();

    const { fetchBalance, fetchBalancePending,tokenData} = useFetchBalance()


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        fetchBalance()
    }, [fetchBalance])

    if (fetchBalancePending){
        return <Grid container>
            <CircularProgress />
        </Grid>
    }


    console.log(tokenData)
    return (
        <div>
            <Grid container style={{
                padding:'24px'
            }}>
                <Grid item xs={12} sm={12} md={12} lg={12} padding={1}>
                    <div style={{color:'#00614b',
                        height: '100%',

                    }}>
                        <Typography variant="body2" sx={{height:'40px'}}>
                            Your Personal Information:
                        </Typography>
                        <div style={{display: 'flex', border: '2px solid #00614b',
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            borderRadius: '32.5px',
                            background:'white',
                            padding: '8px',
                            alignItems:'center',
                            height: 'calc( 100% - 40px )'
                        }}>
                            <Avatar
                                style={{width: matchesSm ? 120: 200, height: matchesSm ? 120: 200}}
                                src={`data:image/png;base64,${new Identicon(
                                    address,
                                    420,
                                ).toString()}`}
                            />
                            <div style={{flexGrow:'1', maxWidth: matchesSm?'calc( 100% - 120px )':'100%'}}>
                                <Typography margin={2} variant="body2" style={{
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    Address: {address}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} padding={1}>
                    <div style={{color:'#00614b',
                        height: '100%'
                    }}>
                        <Typography variant="body2" sx={{height:'40px'}}>
                            Your Balance
                        </Typography>
                        <div style={{display: 'flex', border: '2px solid #00614b',
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            borderRadius: '32.5px',
                            padding: '8px',
                            alignItems:'start',
                            background:'white',
                            height: 'calc( 100% - 40px )'
                        }}>
                            {
                                Object.keys(tokenData).map((token) =>
                                    (<Typography margin={1} variant="body2" style={{
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tokenData[token].token}: {tokenData[token].balance}
                                    </Typography>)
                                )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ControlPanel;
