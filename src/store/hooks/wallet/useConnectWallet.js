import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {connectWallet} from '../../actions/wallet/connectWallet';

export function useConnectWallet() {
    const dispatch = useDispatch();
    const {
        web3,
        address,
        networkId,
        connected,
        web3Modal,
        connectWalletPending,
    } = useSelector(
        (state) => ({
            web3: state.wallet.web3,
            address: state.wallet.address,
            networkId: state.wallet.networkId,
            connected: state.wallet.connected,
            web3Modal: state.wallet.web3Modal,
            connectWalletPending: state.wallet.connectWalletPending,
        }),
        shallowEqual,
    );
    const boundAction = useCallback((data) => dispatch(connectWallet(data)), [
        dispatch,
    ]);

    return {
        web3,
        address,
        networkId,
        connected,
        web3Modal,
        connectWalletPending,
        connectWallet: boundAction,
    };
}
