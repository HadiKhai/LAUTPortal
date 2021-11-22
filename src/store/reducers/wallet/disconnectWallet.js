import {
    HOME_DISCONNECT_WALLET_BEGIN,
    HOME_DISCONNECT_WALLET_FAILURE,
    HOME_DISCONNECT_WALLET_SUCCESS,
} from '../../types/wallet';

const disconnectWallet = (state, action) => {
    switch (action.type) {
        case HOME_DISCONNECT_WALLET_BEGIN:
            return {
                ...state,
                disconnectWalletPending: true,
            };

        case HOME_DISCONNECT_WALLET_SUCCESS:
            return {
                ...state,
                address: '',
                web3: null,
                connected: false,
                disconnectWalletPending: false,
                web3Modal: action.data
            };
        case HOME_DISCONNECT_WALLET_FAILURE:
            return {
                ...state,
                web3: null,
                address: '',
                disconnectWalletPending: false,
            };

        default:
            return state;
    }
};

export default disconnectWallet;
