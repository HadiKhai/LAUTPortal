import BigNumber from "bignumber.js";

export function byDecimals(number, tokenDecimals = 18) {
    const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
    return new BigNumber(number).dividedBy(decimals);
}