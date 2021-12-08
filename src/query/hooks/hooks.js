import {useQuery} from 'react-query';
import * as Api from '../api';
import { buildTxKey } from '../config/keys';

const configureHooks = (queryClient, queryConfig) => {
    const {retry, cacheTime, staleTime} = queryConfig;
    const defaultOptions = {
        retry,
        cacheTime,
        staleTime,
    };

    const useTX = ({address}) =>
        useQuery({
            queryKey: buildTxKey(address),
            queryFn: () => Api.getTx({address}, queryConfig).then(({data}) => data),
            enabled: Boolean(address),

            ...defaultOptions,
        });



    return {useTX};
};

export default configureHooks;
