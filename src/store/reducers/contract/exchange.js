import {DEPOSIT_FAILURE, DEPOSIT_SUCCESS, EXCHANGE_BEGIN} from "../../types/contract";

const exchange = (state, action) => {
    switch (action.type) {
        case EXCHANGE_BEGIN:
            return {
                ...state,
                exchange: {
                    exchangePending: true,
                }
            };

        case DEPOSIT_SUCCESS:
            return {
                ...state,
                exchange: {
                    exchangePending: false,
                }
            };

        case DEPOSIT_FAILURE:
            return {
                ...state,
                exchange: {
                    exchangePending: false,
                }
            };

        default:
            return state;
    }
};

export default exchange;
