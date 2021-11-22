import React, {useEffect} from 'react'
import {Box, Grid, Link, Typography, useMediaQuery, useTheme} from "@mui/material";
import LAULOGO from '../../assets/lau-logo-retina-white.png'
import {Redirect} from "react-router";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import BackgroundLoginImg from '../../assets/background-login.jpeg';
import {AUTH_PATH} from "../../config/routes";
import '../Login/Login.css';
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";
import {Route, Switch} from "react-router-dom";
import Login from "../Login/Login";

const LoginLayout = () => {

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const {explorer, contractAddress} = useGlobalSettings()


    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const infoSide = () => <Grid item xs={12} sm={12} md={6}
                                 style={{
                                     zIndex: matchesMd ? 'unset' : '1',
                                     height: matchesMd ? 'unset' : 'calc(100vh + 100px)'
                                 }}
    >
        <Box alignSelf="center"
             textAlign="center"
             height={matchesMd ? '100vh !important' : 'calc( 100vh + 150px ) !important'}
             style={{
                 backgroundImage: `linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${BackgroundLoginImg})`,
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 boxShadow: 'rgb(0 0 0 / 80%) 0px 0px 100px 80px inset'

             }}>
            <Box  sx={{
                justifyContent: !matchesMd? 'space-between':'',
                display: !matchesMd? 'flex':''
            }}
                  textAlign="end" padding={4}>
            </Box>

            <Box
                alignItems="center"
                alignSelf="center"
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                padding={6}
                height={matchesMd? "calc( 100vh - 104px - 96px)" : "calc( 100vh - 104px - 96px - 7vh )"}

            >
                {matchesMd ?
                    <img src={LAULOGO} alt={"LAU Logo"}></img>
                    :
                    <img src={LAULOGO} alt={"LAU Logo"} style={{width:'80vw'}}></img>
                }

                <Link
                    href={`${explorer}/address/${contractAddress}`}
                    target="_blank"
                    sx={{color: '#00614b', textDecorationColor: '#00614b', letterSpacing: 'unset',marginBottom: '104px'}}
                >
                    Smart Contract Address
                </Link>
            </Box>
            {!matchesMd ?
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '85vh',
                    height:'7vh',
                    marginTop:' 20px'
                }}>
                    <Typography variant='body1' color="white">
                        Scroll Down To Login
                    </Typography>
                    <ArrowCircleDownIcon sx={{color: 'white'}}/>
                </div>
                : <></>
            }
        </Box>
    </Grid>

    return (
        <>
            {matchesMd ?
                (<Grid container style={{maxWidth: '100vw !important', height: '100vh'}}>
                    <Switch>
                        <Route exact path={AUTH_PATH} component={Login}/>
                        <Redirect to={AUTH_PATH}/>
                    </Switch>
                    {infoSide()}
                </Grid>)
                :
                (<Grid container style={{maxWidth: '100vw !important', height: '100vh'}}>
                    {infoSide()}
                    <Switch>
                        <Route exact path={AUTH_PATH} component={Login}/>
                        <Redirect to={AUTH_PATH}/>
                    </Switch>
                </Grid>)
            }
        </>
    )
}

export default LoginLayout;
