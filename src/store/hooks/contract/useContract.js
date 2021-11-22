import {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {exchange} from "../../actions/contract/exchange";
import {fetchAllowance} from "../../actions/contract/fetchAllowance";
import {fetchApproval} from "../../actions/contract/fetchApproval";
import {transfer} from "../../actions/contract/transfer";

export function useContract() {
    const dispatch = useDispatch();
    const {
        exchangePending,
        fetchAllowancePending,
        LAUT,
        USDT,
        fetchApprovePending,
        fetchTransferPending

    } = useSelector(
        (state) => ({
            exchangePending: state.contract.exchange.exchangePending,
            fetchAllowancePending: state.contract.allowance.fetchAllowancePending,
            LAUT: state.contract.allowance.value.LAUT,
            USDT: state.contract.allowance.value.USDT,
            fetchApprovePending: state.contract.approve.fetchApprovePending,
            fetchTransferPending: state.contract.transfer.transferPending

        }),
        shallowEqual,
    );

    const boundAction = useCallback((data) => dispatch(exchange(data)), [
        dispatch,
    ]);

    const boundAction1 = useCallback((data) => dispatch(fetchAllowance(data)), [
        dispatch,
    ]);

    const boundAction2 = useCallback((data) => dispatch(fetchApproval(data)), [
        dispatch,
    ]);

    const boundAction3 = useCallback((data) => dispatch(transfer(data)), [
        dispatch,
    ]);

    return {
        fetchAllowancePending,
        allowance: {
            LAUT,
            USDT
        },
        fetchTransferPending,
        fetchApprovePending,
        exchangePending,
        exchange: boundAction,
        fetchAllowance:boundAction1,
        approve:boundAction2,
        transfer:boundAction3
    };
}
