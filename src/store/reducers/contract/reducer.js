import initialState from "./initialState";
import fetchBalance from "./fetchBalance";
import exchange from "./exchange";
import fetchApproval from "./fetchApproval";
import fetchAllowance from "./fetchAllowance";
import transfer from "./transfer";

const reducers = [fetchBalance,exchange,fetchApproval,fetchAllowance,transfer];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }

    return reducers.reduce((s, r) => r(s, action), newState);
}
