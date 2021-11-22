import React, {useEffect, useState} from 'react'
import {Button, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import styled from "@emotion/styled";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './Exchange.css';
import {useFetchBalance} from "../../store/hooks/contract/useFetchBalance";
import {LAUT} from "../../utils/constants";
import validator from "validator/es";
import {useContract} from "../../store/hooks/contract/useContract";
import Web3 from "web3";


export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px !important',
        background: 'rgb(233,233,233)'
    },
    '&. MuiOutlinedInput-notchedOutline': {
        border: 'hidden'
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none !important',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none !important',
    },
});

const Transfer = () => {

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const {fetchBalance, tokenData} = useFetchBalance()

    const [error,setError] = useState(false)

    const [value,setValue] = useState(0)

    const [to,setTo] = useState('')

    const {transfer,fetchTransferPending}= useContract()

    const changeValue = (value) => {
        const a = validator.isNumeric(value)
        if(a || value==='') {
            if(value<=tokenData[LAUT].balance) {
                setValue(value)
            }
            else{
                setValue(tokenData[LAUT].balance)
            }
        }
    }

    const handleLoginManually = () => {
        const validity = Web3.utils.isAddress(to);
        if (!validity) {
            setError(true)
        } else {
            transfer({to,value})
        }
    }

    const changeTo = (value) => {
        setError(false);
        setTo(value)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        fetchBalance()
    }, [fetchBalance])

    return (
        <div>
            <Grid container style={{
                padding: '24px'
            }}>
                <Grid item xs={12} sm={12} md={12} lg={12} padding={1}>
                    <div style={{
                        color: '#00614b',
                        height: '100%'
                    }}>

                        <div style={{
                            display: 'flex', border: '2px solid #00614b',
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            borderRadius: '32.5px',
                            padding: '20px 8px',
                            alignItems: 'center',

                        }}>
                            <Typography variant="body1" style={{margin:'0px 0px 20px 0px'}}>
                                Your Balance: {tokenData[LAUT].balance} LAUT
                            </Typography>
                            <div style={{display:'flex',flexDirection: !matchesMd? "column":'row',minWidth:'80%',maxWidth:'80%',placeItems:'center'}}>
                                <div style={{minWidth:matchesMd?'45%':'100%',maxWidth:matchesMd?'45%':'100%'}}>
                                    <div style={{display: 'flex',
                                        placeContent: 'center',width:'100%'}}>

                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '65px',
                                        maxWidth: '65px',
                                        borderRadius: '20px 0px 0px 20px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography variant="body1" fontWeight={100}>
                                            LAUT
                                        </Typography>
                                    </div>
                                    <TextField
                                        variant="outlined"
                                        style={{
                                            borderBottom: 'none',
                                            maxWidth: '100%',
                                            alignSelf: 'center',
                                            flexGrow:1,
                                            background: 'rgb(233,233,233)'

                                        }}
                                        value={value}
                                        disabled={fetchTransferPending}
                                        onChange={(newValue) => changeValue(newValue.target.value)}

                                    />
                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '60px',
                                        borderRadius: '0px 20px 20px 0px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={"bolder"}
                                            sx={{cursor: 'pointer'}}
                                            onClick={() => {
                                                if(!fetchTransferPending){
                                                    setValue(tokenData[LAUT].balance)
                                                }
                                            }}
                                        >
                                            MAX
                                        </Typography>
                                    </div>
                                </div>
                                </div>
                                <ArrowRightAltIcon color="primary"
                                                     sx={{
                                                         margin:!matchesMd?'20px 0px':'auto',
                                                         flexGrow:1,
                                                         transform:!matchesMd?'rotate(90deg)':''
                                                     }}
                                />
                                <div style={{minWidth:matchesMd?'45%':'100%',maxWidth:matchesMd?'45%':'100%'}}>
                                    <div style={{display: 'flex', placeContent: 'center'}}>
                                        <CustomTextField
                                            variant="outlined"
                                            style={{
                                                borderBottom: 'none',
                                                maxWidth: '100%',
                                                alignSelf: 'center',
                                                flexGrow:1,
                                                borderRadius: '20px'
                                            }}
                                            value={to}
                                            disabled={fetchTransferPending}
                                            onChange={(newValue) => changeTo(newValue.target.value)}

                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                style={{
                                    minWidth: matchesMd?'30%':'60%',
                                    maxWidth: matchesMd?'30%':'60%',
                                    alignSelf: 'center',
                                    marginTop: '25px',
                                    height: '60px',
                                    borderRadius: '30px',
                                    fontSize: '1em',
                                    background: '#00614b'
                                }}
                                disabled={ !value>0 || fetchTransferPending || to==="" }
                                onClick={handleLoginManually}
                            >
                                Transfer
                            </Button>
                            {
                                error?
                                <Typography variant="body1" style={{color: '#d32f2f',marginTop:'20px'}}>
                                    Invalid Address
                                </Typography>
                                    :<></>
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Transfer;
