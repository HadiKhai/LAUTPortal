import Web3 from 'web3';
import {toast} from "react-toastify";
import React from "react";
import {TOKENS} from "../../../contracts/addresses";
import {fetchBalance} from "./fetchBalance";
import {TOKEN_ABI} from "../../../contracts/TOKEN_ABI";
import {TRANSFER_BEGIN, TRANSFER_FAILED, TRANSFER_SUCCESS} from "../../types/contract";


export function transfer({to,value}) {
    return (dispatch, getState) => {
        dispatch({
            type: TRANSFER_BEGIN
        })
        const { wallet } = getState();
        const { web3, address } = wallet;

        return toast.promise(
            new Promise(async (resolve,reject) => {

                const contract = new web3.eth.Contract(
                    TOKEN_ABI,
                    TOKENS.LAUT.address
                )

                contract.methods.transfer(to,Web3.utils.toWei(value+"", 'ether'))
                    .send({
                        from:address,
                        gasLimit: 78959,
                        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei'))
                    })
                    .on('transactionHash', function (hash) { console.log(hash) })
                    .on('receipt', function (receipt) {
                        console.log(receipt)
                        dispatch({
                            type: TRANSFER_SUCCESS
                        })
                        setTimeout(() => {
                                dispatch(fetchBalance())
                            }
                            ,3000)
                        resolve(receipt.transactionHash)
                    })
                    .on('error',function (error) {
                        console.log(error)
                        dispatch({
                            type: TRANSFER_FAILED
                        })
                        reject('Failed To Transfer, Please Try Later')
                    })
            }),
            {
                pending: `Transferring ${value} LAUT to ${to.slice(0,5)}...`,
                success: {
                    render({data}) {
                        return <div>Transfer {value} LAUT! <a rel="noreferrer"  href={`https://bscscan.com/tx/${data}`} target="_blank">See Tx</a>
                        </div>
                    }
                },
                error: {
                    render({data}) {
                        return data
                    },
                }
            }
        )
    }
}
