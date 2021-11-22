import {
    FETCH_TOKEN_BALANCE_BEGIN,
    FETCH_TOKEN_BALANCE_FAILURE,
    FETCH_TOKEN_BALANCE_SUCCESS
} from "../../types/contract";
import {TOKEN_ABI} from "../../../contracts/TOKEN_ABI";
import {MultiCall} from "eth-multicall";
import {TOKENS} from "../../../contracts/addresses";
import {byDecimals} from "../../../utils/helpers/byDecimals";


export function fetchBalance() {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_TOKEN_BALANCE_BEGIN
        })
        const { wallet } = getState();
        const { web3, address } = wallet;

        console.log('fetchbbb')
        return new Promise((resolve, reject) => {
            const multicall = new MultiCall(
                web3,
                '0x964c522313a8dd1f7c1d69f3528ae10ff52ff438',
            );


            const calls = Object.keys(TOKENS).map((token) => {
                const tokenContract = new web3.eth.Contract(
                    TOKEN_ABI,
                    TOKENS[`${token}`].address,
                );

                console.log(TOKENS[`${token}`].address)
                console.log(tokenContract,address)


                return {
                    token: TOKENS[`${token}`].name,
                    balance: tokenContract.methods.balanceOf(address),
                    address: TOKENS[`${token}`].address
                };
            });

            console.log(calls)
            multicall
                .all([calls])
                .then((results) => {
                    const obj = {};
                    results[0].map((res) => {
                        obj[res.token] = {
                            token: res.token,
                            balance: byDecimals(
                                res.balance,
                                18,
                            ).toNumber()
                        }
                        return ''

                    });
                    dispatch({
                        type: FETCH_TOKEN_BALANCE_SUCCESS,
                        data: obj
                    });
                    resolve(obj);

                }).catch((error) => {
                console.log(error)
                dispatch({
                    type: FETCH_TOKEN_BALANCE_FAILURE,
                });
                return reject(error.message || error);
            });
        })
    }
}
