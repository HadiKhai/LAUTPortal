import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {connectAccount} from "../../actions/globalSettings/connectAccount";
import {disconnectAccount} from "../../actions/globalSettings/disconnectAccount";

export function useGlobalSettings() {

    const dispatch = useDispatch();

    const {
        address,
        connected,
        changeAccountPending,
    } = useSelector(
        (state) => ({
            address: state.globalSettings.account.address,
            connected: state.globalSettings.account.connected,
            changeAccountPending: state.globalSettings.account.changeAccountPending
        }),
        shallowEqual,
    );

    const boundAction2 = useCallback(
        (data) => {
            return dispatch(connectAccount(data));
        },
        [dispatch],
    );

    const boundAction3 = useCallback(
        () => {
            return dispatch(disconnectAccount());
        },
        [dispatch],
    );

    return {
        address,
        connected,
        changeAccountPending,
        connectAccount: boundAction2,
        disconnectAccount: boundAction3
    };
}
