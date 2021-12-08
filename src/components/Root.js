import React from 'react'
import App from "./App";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {queryClient, QueryClientProvider, ReactQueryDevtools,} from '../query';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#00614b',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontWeight: "bolder"
        },
        h2: {
            fontWeight: "bolder"
        },
        h3: {
            fontWeight: "bolder"
        },
        h4: {
            fontWeight: "bolder"
        },
        h5: {
            fontWeight: "bolder"
        },
        h6: {
            fontWeight: "bolder"
        },
        caption: {
            fontWeight: "bolder"
        },
        subtitle1: {
            fontWeight: "bolder"
        },
        subtitle2: {
            fontWeight: "bolder"
        },
        body1: {
            fontWeight: "bolder"
        },
        body2: {
            fontWeight: "bolder"
        },
        button: {
            fontWeight: "bolder",
            fontSize: '0.7em'
        },
    },
    components:{
        MuiInputBase:{
            styleOverrides:{

            }
        },
        MuiFormControl:{
            styleOverrides:{
                root:{
                    borderBottom:'none'
                }
            }
        }
    }
});

const Root = () => (

    <ThemeProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen/>

            <App/>
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                autoClose={2000}
            />
            <ToastContainer />
        </QueryClientProvider>

    </ThemeProvider>
)

export default Root;
