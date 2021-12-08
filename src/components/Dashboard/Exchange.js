import React, {useEffect, useState} from 'react'
import {Button, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import styled from "@emotion/styled";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import './Exchange.css';
import {useFetchBalance} from "../../store/hooks/contract/useFetchBalance";
import {LAUT, USDT} from "../../utils/constants";
import validator from "validator/es";
import {useContract} from "../../store/hooks/contract/useContract";
import {useMutation} from "../../query";
import {TX_MUTATION} from "../../query/config/keys";
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";


export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 'unset !important',
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

const Exchange = () => {

    const theme = useTheme();

    const mutation = useMutation(TX_MUTATION)

    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const {fetchBalance, fetchBalancePending, tokenData} = useFetchBalance()

    const [from,setFrom] = useState(USDT)

    const [to,setTo] = useState(LAUT)

    const { address } = useGlobalSettings()

    const [error,setError] = useState('')

    const [fromValue,setFromValue] = useState(0)

    const [toValue,setToValue] = useState(0)

    const {exchangePending,exchange,fetchAllowance, allowance,fetchApprovePending,approve, fetchAllowancePending}= useContract()
    const switchExch = () => {
        setFrom(to)
        setTo(from)
    }

    const handleSwap = () => {
        exchange({from,fromValue,to,toValue}).then((transactionHash) =>
            mutation.mutate(
                {
                    id:transactionHash,
                    receiver:'EXCHANGE',
                    sender:address,
                    type:from===USDT?'DEPOSIT':'WITHDRAW',
                    amount:fromValue,
                    details:{}
                }
            )
        )

    }
    const changeFromValue = (value) => {
        const a = validator.isNumeric(value)
        if(a || value==='') {
            if(value<=tokenData[from].balance) {
                setFromValue(value)
                setToValue(value)
            }
            else{
                setFromValue(tokenData[from].balance)
                setToValue(tokenData[from].balance)
            }
        }
    }

    const changeToValue = (value) => {
        const a = validator.isNumeric(value)
        if(a || value==='') {
            setFromValue(value)
            setToValue(value)
        }
    }

    const handleApprove = async () => {
        await approve(from)
    }
    useEffect(() => {
        console.log(tokenData)
        if(!fetchBalancePending && Object.keys(tokenData).length!==0) {
            if (toValue > tokenData[from].balance) {
                setError('Insufficient Balance')
            } else {
                setError('')
            }
        }
    },[toValue,tokenData,fetchBalancePending,from,fromValue])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        fetchBalance()
    }, [fetchBalance])

    useEffect(() => {
        fetchAllowance(from)
    },[from,fetchAllowance])

    console.log(exchangePending,allowance)
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
                            <div style={{minWidth:'50%'}}>
                                <div style={{
                                    background: 'rgb(233,233,233)',
                                    borderRadius: '20px 20px 0px 0px',
                                    paddingTop:'5px'
                                }}>
                                    <Typography variant="caption" sx={{marginLeft: '10px'}}>
                                        Balance: {tokenData[from].balance}
                                    </Typography>
                                </div>
                                <div style={{display: 'flex', placeContent: 'center',width:'100%'}}>

                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '65px',
                                        maxWidth: '65px',
                                        borderRadius: '0px 0px 0px 20px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography variant="body1" fontWeight={100}>
                                            {from}
                                        </Typography>
                                    </div>
                                    <CustomTextField
                                        variant="outlined"
                                        style={{
                                            borderBottom: 'none',
                                            maxWidth: '100%',
                                            alignSelf: 'center',
                                            flexGrow:1
                                        }}
                                        value={fromValue}
                                        onChange={(newValue) => changeFromValue(newValue.target.value)}

                                    />
                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '60px',
                                        borderRadius: '0px 0px 20px 0px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={"bolder"}
                                            sx={{cursor: 'pointer'}}
                                            onClick={() => {
                                                setFromValue(tokenData[from].balance)
                                                setToValue(tokenData[from].balance)
                                            }}
                                        >
                                            MAX
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <ArrowCircleDownIcon color="primary"
                                                 sx={{
                                                     margin:'10px 0px',
                                                     cursor:'pointer',
                                                 }}
                                                 onClick={switchExch}
                            />
                            <div style={{minWidth:'50%'}}>
                                <div style={{
                                    background: 'rgb(233,233,233)',
                                    borderRadius: '20px 20px 0px 0px',
                                    paddingTop:'5px'
                                }}>
                                    <Typography variant="caption" sx={{marginLeft: '10px'}}>
                                        Balance: {tokenData[to].balance}
                                    </Typography>
                                </div>
                                <div style={{display: 'flex', placeContent: 'center'}}>

                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '65px',
                                        maxWidth: '65px',
                                        borderRadius: '0px 0px 0px 20px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography variant="body1" fontWeight={100}>
                                            {to}
                                        </Typography>
                                    </div>
                                    <CustomTextField
                                        variant="outlined"
                                        error={error}
                                        style={{
                                            borderBottom: 'none',
                                            maxWidth: '100%',
                                            alignSelf: 'center',
                                            flexGrow:1
                                        }}
                                        value={toValue}
                                        onChange={(newValue) => changeToValue(newValue.target.value)}

                                    />
                                    <div style={{
                                        background: 'rgb(233,233,233)',
                                        height: '56px',
                                        minWidth: '60px',
                                        borderRadius: '0px 0px 20px 0px',
                                        display: 'flex',
                                        placeItems: 'center',
                                        padding: '0px 10px'
                                    }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={"bolder"}
                                            sx={{cursor: 'pointer'}}
                                            onClick={() => {
                                                setToValue(tokenData[to].balance)
                                                setFromValue(tokenData[to].balance)
                                            }}
                                        >
                                            MAX
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            {
                                allowance[from]===0 || allowance[from]==='0' ?
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
                                            background: '#d32f2f'
                                        }}
                                        onClick={handleApprove}
                                        disabled={fetchAllowancePending || fetchApprovePending}
                                    >
                                        Approve
                                    </Button>:

                                        error===""?
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
                                            onClick={handleSwap}
                                            disabled={exchangePending || !fromValue>0 }
                                        >
                                            Swap
                                        </Button>
                                        :
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
                                            }}
                                            disabled
                                        >
                                            {error}
                                        </Button>

                            }
                         </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Exchange;
