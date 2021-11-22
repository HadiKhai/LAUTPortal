import {APPROVE_BEGIN, APPROVE_FAILED, APPROVE_SUCCESS} from "../../types/contract";
import {TOKEN_ABI} from "../../../contracts/TOKEN_ABI";
import {CONTRACTS, TOKENS} from "../../../contracts/addresses";
import {toast} from "react-toastify";

const UNLIMITED_APPROVAL = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export function fetchApproval(from) {
    return (dispatch, getState) => {
        dispatch({
            type: APPROVE_BEGIN,
        });
        return toast.promise(
            new Promise(async (resolve, reject) => {

                const {wallet} = getState();
                const {web3, address} = wallet;
                const contract = new web3.eth.Contract(TOKEN_ABI, TOKENS[from].address);

                console.log(address,contract)
                contract.methods
                    .approve(CONTRACTS.EXCHANGE, UNLIMITED_APPROVAL)
                    .send({
                        from: address})
                     .on('transactionHash', function (hash) {
                        console.log(hash)
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt)
                        dispatch({
                            type: APPROVE_SUCCESS,
                            data: parseInt(UNLIMITED_APPROVAL, 16),
                            token:from
                        })

                        resolve(receipt.transactionHash)
                    })
                    .on('error', function (error) {
                        console.log(error)
                        dispatch({
                            type: APPROVE_FAILED
                        })
                        reject('Failed To Approve, Please Try Later')
                    })
            }),
            {
                pending: `Approving...`,
                success: {
                    render({data}) {
                        return <div>Approve! <a rel="noreferrer" href={`https://bscscan.com/tx/${data}`}
                                                target="_blank">See Tx</a>
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