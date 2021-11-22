import Web3 from 'web3';
import {
    HOME_ACCOUNTS_CHANGED,
    HOME_CONNECT_WALLET_BEGIN,
    HOME_CONNECT_WALLET_FAILURE,
    HOME_CONNECT_WALLET_SUCCESS,
    HOME_NETWORK_CHANGED,
} from '../../types/wallet';
import {disconnectWallet} from './disconnetWallet';
import {toast} from "react-toastify";
import {ACCOUNT_CHANGE} from "../../types/globalSettings";
import {fetchAllowance} from "../contract/fetchAllowance";
import {BSC} from "../../types/constants";

export function connectWallet(web3Modal) {
    return async (dispatch,getState) => {
        dispatch({type: HOME_CONNECT_WALLET_BEGIN});

        const { globalSettings: { globalChain: { name} } } = getState();

        return toast.promise(
            new Promise(async (resolve,reject) => {
                try{
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            web3.eth.extend({
                methods: [
                    {
                        name: 'chainId',
                        call: 'eth_chainId',
                        outputFormatter: web3.utils.hexToNumber,
                    },
                ],
            });
            const subscribeProvider = (provider) => {
                if (!provider.on) {
                    return;
                }
                provider.on('connect', () => {
                    console.log("connected")
                });
                provider.on('close', () => {
                    console.log('close')
                    dispatch(disconnectWallet(web3, web3Modal));
                });
                // provider.on('disconnect', async () => {
                //     console.log('disconnect')
                //     dispatch(disconnectWallet(web3, web3Modal));
                // });
                provider.on('accountsChanged', async (accounts) => {
                    console.log('accountsChanged')
                    if (accounts[0]) {
                        dispatch({type: HOME_ACCOUNTS_CHANGED, data: accounts[0]});
                        dispatch({type: ACCOUNT_CHANGE, data: accounts[0]});
                        dispatch(fetchAllowance())
                    } else {
                        dispatch(disconnectWallet(web3, web3Modal));
                    }
                });
                provider.on('chainChanged', async (chainId) => {
                    const networkId = web3.utils.isHex(chainId)
                        ? web3.utils.hexToNumber(chainId)
                        : chainId;
                    dispatch({type: HOME_NETWORK_CHANGED, data: networkId});
                });
            };
            subscribeProvider(provider);

            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            const networkId = await web3.eth.net.getId();
            if(networkId === BSC.networkId) {
                dispatch({
                    type: HOME_CONNECT_WALLET_SUCCESS,
                    data: {web3, address, networkId, web3Modal},
                });
                resolve()
            } else {
                dispatch({type: HOME_CONNECT_WALLET_FAILURE});
                dispatch(disconnectWallet(web3, web3Modal));
                reject(`Switch Your Wallet To ${name}`)
            }
        } catch (error) {
            console.log('error: ' + error)
            dispatch({type: HOME_CONNECT_WALLET_FAILURE});
            reject('Failure to connect, Try later')
        }
    }),
            {
                pending: 'Connecting To Your Wallet',
                success: 'Connected!',
                error: {
                    render({data}){
                        return data
                    },
                }
            })
    }
}
