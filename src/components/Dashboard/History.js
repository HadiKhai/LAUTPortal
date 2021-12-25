import React, {useEffect} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import {useGlobalSettings} from "../../store/hooks/globalSettings/useGlobalSettings";
import {hooks} from "../../query";
import moment from "moment";

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:
        '#00614b',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#00614b',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#f8f8f8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const History =  () => {
    const {address} = useGlobalSettings()
    const { data: transactions, isLoading } = hooks.useTX({address})
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if(isLoading){
        return <CircularProgress />
    }

    console.log(transactions.map(({date}) => moment(date)))
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
                            <Grid container style={{
                                padding: '0px'
                            }}>
                                <Grid xs={12} sm={12} md={6} lg={6} item padding={1}>
                                    <div style={{
                                        borderRadius: '2px',
                                        padding: '8px',
                                        height: '100%',
                                        color: '#00614b',
                                    }}>
                                        <Typography variant="body1" padding={1} marginBottom={2}>
                                            Exchanges:
                                        </Typography>
                                        <TableContainer component={Paper} sx={{
                                            boxShadow: 'unset'
                                        }}>
                                            <Table aria-label="Lost Profit Table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="left">Tx Hash</StyledTableCell >
                                                        <StyledTableCell align="center">Amount</StyledTableCell>
                                                        <StyledTableCell align="center">Type</StyledTableCell>
                                                        <StyledTableCell align="right">Date</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {transactions.filter((val) => val.type==="WITHDRAW"||val.type==="DEPOSIT").map((row) => (
                                                        <StyledTableRow key={row['id']}>
                                                            <StyledTableCell align="left">
                                                                <Link to={{pathname: `https://bscscan.com/tx/${row['id']}`}} target="_blank">
                                                                    {row['id'].slice(0, 10)}...
                                                                </Link>
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th"  align="left" scope="row">
                                                                {row['amount']}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                                                            <StyledTableCell align="right">{ moment(row.date).format('DD-MM-YYYY')}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item padding={1}>
                                    <div style={{
                                        borderRadius: '2px',
                                        padding: '8px',
                                        height: '100%',
                                        color: '#00614b',
                                    }}>
                                        <Typography variant="body1" padding={1} marginBottom={2}>
                                            Transfers:
                                        </Typography>
                                        <TableContainer component={Paper} sx={{
                                            boxShadow: 'unset'
                                        }}>
                                            <Table aria-label="Lost Profit Table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="left">Tx Hash</StyledTableCell >
                                                        <StyledTableCell align="left">Receiver</StyledTableCell >
                                                        <StyledTableCell align="center">Amount</StyledTableCell>
                                                        <StyledTableCell align="center">Type</StyledTableCell>
                                                        <StyledTableCell align="right">Date</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {transactions.filter((val) => val.type==="TRANSFER").map((row) => (
                                                        <StyledTableRow key={row['id']}>
                                                            <StyledTableCell align="left">
                                                                <Link to={{pathname: `https://bscscan.com/tx/${row['id']}`}} target="_blank">
                                                                    {row['id'].slice(0, 10)}...
                                                                </Link>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Link to={{pathname: `https://bscscan.com/address/${row['receiver']}`}} target="_blank">
                                                                    {row['receiver'].slice(0, 10)}...
                                                                </Link>
                                                            </StyledTableCell>

                                                            <StyledTableCell component="th"  align="left" scope="row">
                                                                {row['amount']}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                                                            <StyledTableCell align="right">{ moment(row.date).format('DD-MM-YYYY')}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item padding={1}>
                                    <div style={{
                                        borderRadius: '2px',
                                        padding: '8px',
                                        height: '100%',
                                        color: '#00614b',
                                    }}>
                                        <Typography variant="body1" padding={1} marginBottom={2}>
                                            Purchases:
                                        </Typography>
                                        <TableContainer component={Paper} sx={{
                                            boxShadow: 'unset'
                                        }}>
                                            <Table aria-label="Lost Profit Table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="left">Tx Hash</StyledTableCell >
                                                        <StyledTableCell align="left">Store</StyledTableCell>
                                                        <StyledTableCell align="left">Location</StyledTableCell>
                                                        <StyledTableCell align="left">Receiver</StyledTableCell>
                                                        <StyledTableCell align="center">Amount</StyledTableCell>
                                                        <StyledTableCell align="center">Type</StyledTableCell>
                                                        <StyledTableCell align="right">Date</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {transactions.filter((val) => val.type==="BUY"||val.type==="REFUND").map((row) => (
                                                        <StyledTableRow key={row['id']}>
                                                            <StyledTableCell align="left">
                                                                <Link to={{pathname: `https://bscscan.com/tx/${row['id']}`}} target="_blank">
                                                                    {row['id'].slice(0, 10)}...
                                                                </Link>
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th"  align="left" scope="row">
                                                                {row['store']}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th"  align="left" scope="row">
                                                                {row['location']}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Link to={{pathname: `https://bscscan.com/address/${row['receiver']}`}} target="_blank">
                                                                    {row['receiver'].slice(0, 10)}...
                                                                </Link>
                                                            </StyledTableCell>

                                                            <StyledTableCell component="th"  align="left" scope="row">
                                                                {row['amount']}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center">{row.type}</StyledTableCell>
                                                            <StyledTableCell align="right">{ moment(row.date).format('DD-MM-YYYY')}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default History;


