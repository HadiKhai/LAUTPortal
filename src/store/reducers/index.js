import {combineReducers} from 'redux';
import walletReducer from './wallet/reducer';
import globalSettingsReducer from './globalSettings/reducer';
import contractReducer from './contract/reducer';

export default combineReducers({
    wallet: walletReducer,
    globalSettings: globalSettingsReducer,
    contract: contractReducer
});
