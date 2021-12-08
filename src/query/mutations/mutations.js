import * as Api from '../api';
import {buildTxKey, TX_MUTATION} from "../config/keys";


export default (queryClient, queryConfig) => {

    queryClient.setMutationDefaults(TX_MUTATION, {
        mutationFn: (payload) =>
            Api.createTx(payload, queryConfig).then((newTx) => ({
                address: payload.sender,
                ...newTx,
            })),

        onSettled: (_newItem, _err, payload) => {
            queryClient.invalidateQueries(buildTxKey());
        },
    });
}

