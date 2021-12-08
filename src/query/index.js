import {API_HOST} from "../utils/constants";
import configureQueryClient from "./queryClient";

const {
    queryClient,
    QueryClientProvider,
    hooks,
    ReactQueryDevtools,
    useMutation,
    API_ROUTES,
} = configureQueryClient({
    API_HOST,
    // notifier,
});

export {
    queryClient,
    QueryClientProvider,
    hooks,
    ReactQueryDevtools,
    API_ROUTES,
    useMutation
};
