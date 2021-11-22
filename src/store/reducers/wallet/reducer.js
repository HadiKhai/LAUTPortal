import connectWallet from './connectWallet';
import disconnectWallet from './disconnectWallet';
import {createWeb3Modal} from "../../../utils/helpers/createWeb3Modal";

const reducers = [connectWallet, disconnectWallet];

const initialState = {
    address: '',
    web3: null,
    connected: false,
    networkId: 56,
    web3Modal: createWeb3Modal(),
    connectWalletPending: false,
    disconnectWalletPending: false,
};


export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
