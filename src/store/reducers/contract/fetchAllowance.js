import {FETCH_ALLOWANCE_BEGIN, FETCH_ALLOWANCE_FAILED, FETCH_ALLOWANCE_SUCCESS} from "../../types/contract";

const fetchAllowance = (state, action) => {
    console.log(action)
    switch (action.type) {
        case FETCH_ALLOWANCE_BEGIN:
            return {
                ...state,
                allowance:{
                    ...state.allowance,
                    fetchAllowancePending:true,
                }
            };

        case FETCH_ALLOWANCE_FAILED:
            return {
                ...state,
                allowance: {
                    ...state.allowance,
                    fetchAllowancePending: false,
                }
            };

        case FETCH_ALLOWANCE_SUCCESS:
            return {
                ...state,
                allowance: {
                    value: {
                        ...state.allowance.value,
                        [`${action.token}`]:action.data
                    },

                    fetchAllowancePending: false,
                 }
            };

        default:
            return state;
    }
};

export default fetchAllowance;