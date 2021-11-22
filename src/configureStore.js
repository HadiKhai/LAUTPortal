import {applyMiddleware, compose, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './store/reducers';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['globalSettings']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = compose ;

const ConfigureStore = () => {
    let store = createStore(persistedReducer, composeWithDevTools(composeEnhancers(applyMiddleware(thunk))))
    return {store}
}

export default ConfigureStore
