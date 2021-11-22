const initialState = {
    balance:{
        data: {
            LAUT:'0',
            USDT:'0'
        },
        fetchBalancePending:false,
        error:false
    },
    exchange:{
        exchangePending:false
    },
    allowance:{
        fetchAllowancePending:false,
        value: {
            LAUT:'0',
            USDT:'0'
        }
    },
    approve:{
        fetchApprovePending:false,
    },
    transfer:{
        transferPending: false
    }
};

export default initialState;
