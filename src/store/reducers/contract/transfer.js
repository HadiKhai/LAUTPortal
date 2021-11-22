import {
    TRANSFER_BEGIN,
    TRANSFER_FAILED,
    TRANSFER_SUCCESS
} from "../../types/contract";

const exchange = (state, action) => {
    switch (action.type) {
        case TRANSFER_BEGIN:
            return {
                ...state,
                transfer: {
                    transferPending: true,
                }
            };

        case TRANSFER_SUCCESS:
            return {
                ...state,
                transfer: {
                    transferPending: false,
                }
            };

        case TRANSFER_FAILED:
            return {
                ...state,
                transfer: {
                    transferPending: false,
                }
            };

        default:
            return state;
    }
};

export default exchange;
