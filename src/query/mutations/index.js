import mutations from './mutations';

const configureMutations = (queryClient, queryConfig) => {
    mutations(queryClient, queryConfig)
};

export default configureMutations;
