import {APPROVE_BEGIN, APPROVE_FAILED, APPROVE_SUCCESS,} from "../../types/contract";

const fetchApproval = (state, action) => {
    switch (action.type) {
        case APPROVE_BEGIN:
            return {
                ...state,
                approve:{
                    fetchApprovePending:true,
                }
            };

        case APPROVE_FAILED:
            return {
                ...state,
                approve: {
                    fetchApprovePending: false,
                }
            };

        case APPROVE_SUCCESS:
            return {
                ...state,
                approve: {
                    fetchApprovePending: false,
                },
                allowance: {
                    value: {
                        ...state.allowance.value,
                        [`${action.token}`]: action.data
                    },
                    fetchAllowancePending: false,
                }
            };

        default:
            return state;
    }
};

export default fetchApproval;