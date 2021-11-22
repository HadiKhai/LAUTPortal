import {BSC} from "../../types/constants";

const initialState = {
    globalChain: {
        ...BSC,
    },
    account: {
        address: '',
        connected: false,
        changeAccountPending: false
    }
};

export default initialState;
