import {DISCONNECT_ACCOUNT_BEGIN, DISCONNECT_ACCOUNT_SUCCESS} from "../../types/globalSettings";


export function disconnectAccount() {

    return (dispatch) => {
        dispatch({
            type: DISCONNECT_ACCOUNT_BEGIN
        });

        dispatch({type: DISCONNECT_ACCOUNT_SUCCESS})
    }
}
