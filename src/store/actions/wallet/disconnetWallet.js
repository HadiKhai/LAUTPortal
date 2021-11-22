import {
    HOME_DISCONNECT_WALLET_BEGIN,
    HOME_DISCONNECT_WALLET_FAILURE,
    HOME_DISCONNECT_WALLET_SUCCESS,
} from '../../types/wallet';

export function disconnectWallet(web3, web3Modal) {
    return (dispatch) => {
        dispatch({type: HOME_DISCONNECT_WALLET_BEGIN});

        const promise = new Promise(async (resolve, reject) => {
            try {
                if (web3 && web3.currentProvider && web3.currentProvider.close) {
                    await web3.currentProvider.close();
                }
                await web3Modal.clearCachedProvider();
                dispatch({type: HOME_DISCONNECT_WALLET_SUCCESS, data: web3Modal});
                resolve();
            } catch (error) {
                dispatch({type: HOME_DISCONNECT_WALLET_FAILURE});
                reject(error);
            }
        });
        return promise;
    };
}
