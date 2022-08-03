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

const fields = Data.map((record) => {
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

function getCompanyData(affidavitNo) {
    let companyData = {};
    for (let i = 0; i < Data.length; i++) {
        let transaction = Data[i].PARTA_TRANSACTION;

        if (transaction.AFFIDAVITNO === affidavitNo) {
            companyData.affidavitNo = transaction.AFFIDAVITNO
            companyData.coverage = transaction.COVERAGE;
            if (transaction.COMPANY && transaction.COMPANY.length) {
                if (transaction.COMPANY[0].COMPANYNAME.includes("Company")) {
                    // debugger
                    transaction.COMPANY[0].COMPANYNAME = transaction.COMPANY[0].COMPANYNAME.replace("Company", "Co.")
                }
                companyData.CoName = transaction.COMPANY[0].COMPANYNAME;
                companyData.CoNumber = transaction.COMPANY[0].COMPANYNUMBER;
            }

            return companyData;
        }
    }

    return companyData;
}

export {fields, getCompanyData}