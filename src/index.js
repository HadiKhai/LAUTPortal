import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from "./components/Root";
import ConfigureStore from './configureStore'
import {CircularProgress} from "@mui/material";
import {persistStore} from "redux-persist";


const ProviderAll = ({store}) => {
    const [rehydrated, setRehydrated] = useState(false)
    const [persist, setPersist] = useState({})

    useEffect(() => {
        setPersist(persistStore(store, {}, () => setRehydrated(true)))
    }, [store])

    if (!rehydrated) {
        return <CircularProgress/>
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<CircularProgress/>} persistor={persist}>
                <Root/>
            </PersistGate>
        </Provider>
    )
}

const {store} = ConfigureStore();

ReactDOM.render(
    <ProviderAll store={store}/>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
