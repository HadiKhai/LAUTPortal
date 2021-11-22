import {
    FETCH_TOKEN_BALANCE_BEGIN,
    FETCH_TOKEN_BALANCE_FAILURE,
    FETCH_TOKEN_BALANCE_SUCCESS
} from "../../types/contract";

const fetchBalance = (state, action) => {
    switch (action.type) {
        case FETCH_TOKEN_BALANCE_BEGIN:
            return {
                ...state,
                balance:{
                    ...state.balance,
                    fetchBalancePending:true,
                    error:false
                }
            };

        case FETCH_TOKEN_BALANCE_FAILURE:
            return {
                ...state,
                balance: {
                    data: {},
                    fetchBalancePending: false,
                    error:true
                }
            };

        case FETCH_TOKEN_BALANCE_SUCCESS:
            return {
                ...state,
                balance: {
                    data: action.data,
                    fetchBalancePending: false,
                    error:false
                }
            };

        default:
            return state;
    }
};

export default fetchBalance;