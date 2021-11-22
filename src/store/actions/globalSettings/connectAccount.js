import {CONNECT_ACCOUNT_BEGIN, CONNECT_ACCOUNT_SUCCESS} from "../../types/globalSettings";
import {toast} from "react-toastify";


export function connectAccount({address, connected}) {
    return (dispatch,getState) => {
        const { globalSettings: { account: {connected: accConnected} } } = getState()
        dispatch({
            type: CONNECT_ACCOUNT_BEGIN
        });

        dispatch({
            type: CONNECT_ACCOUNT_SUCCESS,
            data: {address, connected}
        })
        if(!accConnected) {
            toast.success('Welcome to your LAUT Portal')
        }
    }
}
