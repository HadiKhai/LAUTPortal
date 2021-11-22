import {
    ACCOUNT_CHANGE,
    CONNECT_ACCOUNT_BEGIN,
    CONNECT_ACCOUNT_SUCCESS,
    DISCONNECT_ACCOUNT_BEGIN,
    DISCONNECT_ACCOUNT_SUCCESS
} from "../../types/globalSettings";

const ChangeAccount = (state, action) => {
    switch (action.type) {
        case CONNECT_ACCOUNT_BEGIN:
            return {
                ...state,
                account: {
                    ...state.account,
                    changeAccountPending: true,
                }
            };

        case DISCONNECT_ACCOUNT_BEGIN:
            return {
                ...state,
                account: {
                    ...state.account,
                    changeAccountPending: true,
                }
            };

        case CONNECT_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: {
                    ...action.data,
                    changeAccountPending: false
                },
            };

        case ACCOUNT_CHANGE:
            return {
                ...state,
                account: {
                    address: action.data,
                },
            };

        case DISCONNECT_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: {
                    preview: false,
                    address: '',
                    connected: false,
                    id: '',
                    level: '',
                    changeAccountPending: false
                },
            };

        default:
            return state;
    }
};

export default ChangeAccount
