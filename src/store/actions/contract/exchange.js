import Web3 from 'web3';
import {toast} from "react-toastify";
import React from "react";
import {DEPOSIT_FAILURE, DEPOSIT_SUCCESS, EXCHANGE_BEGIN} from "../../types/contract";
import {EXCHANGE_ABI} from "../../../contracts/EXCHANGE_ABI";
import {CONTRACTS} from "../../../contracts/addresses";
import {USDT} from "../../../utils/constants";
import {fetchBalance} from "./fetchBalance";


export function exchange({from, to, fromValue, toValue}) {
    return (dispatch, getState) => {
        dispatch({
            type: EXCHANGE_BEGIN
        })
        const { wallet } = getState();
        const { web3, address } = wallet;

        console.log(address,fromValue)
        if(from===USDT){
            return toast.promise(
                new Promise(async (resolve,reject) => {

                    const contract = new web3.eth.Contract(
                        EXCHANGE_ABI,
                        CONTRACTS.EXCHANGE
                    )

                    console.log(Web3.utils.toWei(fromValue+"", 'ether'), CONTRACTS.EXCHANGE)
                    contract.methods.deposit(Web3.utils.toWei(fromValue+"", 'ether'))
                        .send({
                            from:address,
                            gasLimit: 1545127,
                            gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei'))
                        })
                        .on('transactionHash', function (hash) { console.log(hash) })
                        .on('receipt', function (receipt) {
                            console.log(receipt)
                            dispatch({
                                type: DEPOSIT_SUCCESS
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
                                type: DEPOSIT_FAILURE
                            })
                            reject('Failed To Buy, Please Try Later')
                        })
                }),
                {
                    pending: `Buying ${toValue} LAUT`,
                    success: {
                        render({data}) {
                            return <div>Bought {toValue} LAUT! <a rel="noreferrer"  href={`https://bscscan.com/tx/${data}`} target="_blank">See Tx</a>
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
        else{
            return toast.promise(
                new Promise(async (resolve,reject) => {

                    const contract = new web3.eth.Contract(
                        EXCHANGE_ABI,
                        CONTRACTS.EXCHANGE
                    )

                    console.log(Web3.utils.toWei(fromValue+"", 'ether'), CONTRACTS.EXCHANGE)
                    contract.methods.withdraw(Web3.utils.toWei(fromValue+"", 'ether'))
                        .send({
                            from:address,
                            gasLimit: 1545127,
                            gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei'))
                        })
                        .on('transactionHash', function (hash) { console.log(hash) })
                        .on('receipt', function (receipt) {
                            console.log(receipt)
                            dispatch({
                                type: DEPOSIT_SUCCESS
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
                                type: DEPOSIT_FAILURE
                            })
                            reject('Failed To Sell, Please Try Later')
                        })
                }),
                {
                    pending: `Selling ${toValue} LAUT`,
                    success: {
                        render({data}) {
                            return <div>Sold {toValue} LAUT! <a rel="noreferrer"  href={`https://bscscan.com/tx/${data}`} target="_blank">See Tx</a>
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
}
