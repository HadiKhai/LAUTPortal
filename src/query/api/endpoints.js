import {httpClient} from './utils';
import {
    CREATE_TX,
    GET_TX,
} from './routes';

export const getTx = async ({address}, {API_HOST}) => {
    return httpClient(API_HOST).post(GET_TX, {address}).catch((e) => console.log(e))
};

export const createTx = async ({id,sender,receiver,type,amount,details}, {API_HOST}) => {
    return httpClient(API_HOST).post(CREATE_TX, {id,sender,receiver,type,amount,details}).catch((e) => console.log(e))
};
