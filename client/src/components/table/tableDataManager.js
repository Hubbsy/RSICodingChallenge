import Data from "../../data";

const tableFields = {
    "AFFIDAVITNO":true,
    "POLICYNO":true,
    "RISKINSUREDNAME":true,
    "TRANSACTIONTYPE":true,
    "AMOUNT":true,
    "EFFECTIVEDATE":true,
    "EXPIRATIONDATE":true,
    "BATCHID":true,
    "RECEIVEDATE":true,
    "PROCESSEDSTATE":true,
}

export const fields = Data.map((record) => {
    let transaction = record.PARTA_TRANSACTION;
    let mappedData = {};
    for (let key in transaction) {

        if (tableFields.hasOwnProperty(key)) {
            if (transaction[key] === null || !transaction[key]) {
                mappedData[key] = "N/A";
            }
            else {
                mappedData[key] = transaction[key];
            }
        }
    }

    return mappedData
});