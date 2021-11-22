import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {fetchBalance} from '../../actions/contract/fetchBalance';

export function useFetchBalance() {
    const dispatch = useDispatch();

    const {fetchBalancePending,tokenData, error} = useSelector(
        (state) => ({
            fetchBalancePending: state.contract.balance.fetchBalancePending,
            tokenData: state.contract.balance.data,
            error: state.contract.balance.error
        }),
        shallowEqual,
    );

    const boundAction = useCallback(
        () => {
            return dispatch(fetchBalance());
        },
        [dispatch],
    );

    return {
        fetchBalance: boundAction,
        fetchBalancePending,
        tokenData,
        error
    };
}
