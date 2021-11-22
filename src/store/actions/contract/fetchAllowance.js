import {FETCH_ALLOWANCE_BEGIN, FETCH_ALLOWANCE_FAILED, FETCH_ALLOWANCE_SUCCESS} from "../../types/contract";
import {TOKEN_ABI} from "../../../contracts/TOKEN_ABI";
import {CONTRACTS, TOKENS} from "../../../contracts/addresses";


export function fetchAllowance(tokenName) {
    return (dispatch, getState) => {
        dispatch({
            type: FETCH_ALLOWANCE_BEGIN,
        });
        return new Promise(async (resolve, reject) => {

            const { wallet } = getState();
            const { web3, address } = wallet;
            const contract = new web3.eth.Contract(TOKEN_ABI, TOKENS[tokenName].address);

            contract.methods
                .allowance(address, CONTRACTS.EXCHANGE)
                .call()
                .then((res) => {
                    console.log(res)
                    dispatch(
                        {
                            type: FETCH_ALLOWANCE_SUCCESS,
                            data: res,
                            token: tokenName
                        }
                    )

                })
                .catch((error) => {
                        console.log(error)
                        dispatch(
                            {
                                type: FETCH_ALLOWANCE_FAILED
                            }
                        )
                    }
                )
        })
    }
}