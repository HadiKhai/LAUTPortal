import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {disconnectWallet} from '../../actions/wallet/disconnetWallet';

export function useDisconnectWallet() {
    const dispatch = useDispatch();
    const disconnectWalletPending = useSelector(
        (state) => state.wallet.disconnectWalletPending,
        shallowEqual,
    );
    const boundAction = useCallback(
        (web3, web3Modal) => dispatch(disconnectWallet(web3, web3Modal)),
        [dispatch],
    );

    return {disconnectWalletPending, disconnectWallet: boundAction};
}
