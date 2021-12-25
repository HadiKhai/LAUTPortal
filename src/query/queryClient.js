import {QueryClient, QueryClientProvider, useMutation} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {CACHE_TIME_MILLISECONDS, STALE_TIME_MILLISECONDS,} from './config/constants';
import configureHooks from './hooks';
import configureMutations from "./mutations/mutations";


const configureQueryClient = () => {
    const baseConfig = {
        API_HOST:
            'https://lautoken.azurewebsites.net/api',
        keepPreviousData: true,
    };

    const queryClient = new QueryClient();

    const queryConfig = {
        ...baseConfig,
        staleTime: STALE_TIME_MILLISECONDS,
        cacheTime: CACHE_TIME_MILLISECONDS,
    };

    configureMutations(queryClient,queryConfig)
    const hooks = configureHooks(queryClient, queryConfig);

    // returns the queryClient and relative instances
    return {
        queryClient,
        QueryClientProvider,
        hooks,
        useMutation,
        ReactQueryDevtools,
    };
};

export default configureQueryClient
