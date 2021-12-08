import configureHooks from './hooks';

const hooks = (queryClient, queryConfig) => ({
    ...configureHooks(queryClient, queryConfig),
});

export default hooks;
