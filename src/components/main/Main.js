import React from 'react';
import {AppBar, Box, FormControl, Toolbar,} from "@mui/material";
import LAULOGO from '../../assets/lau-logo-retina-white.png';
import './Main.css';
import styled from "@emotion/styled";

export const CustomFormControl = styled(FormControl)({
    '& .MuiFilledInput-root': {
        borderRadius: '20px !important',
    },
    '& .MuiSelect-select':{
        padding: '8px !important'
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none !important',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none !important',
    },
});

const Main = ({children}) => {

    return (
        <Box>
            <AppBar position="sticky" className="header">
                <Toolbar sx={{paddingLeft: '0 !important'}}>
                    <img className={"logo"} src={LAULOGO} height={40} alt="logo"
                          style={{pointerEvents: "all", cursor: 'pointer'}}/>
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    )
}

export default Main;
