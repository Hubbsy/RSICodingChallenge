import {FormControl, Input, InputAdornment} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

export const columns = [
    {title: "Affidavit No", field: "AFFIDAVITNO", filterComponent: (props) => <CustomColumnFilter {...props} />},
    {title: "Policy No", field: "POLICYNO", filterComponent: (props) => <CustomColumnFilter {...props} />},
    {title: "Insured Name", field: "RISKINSUREDNAME", filterComponent: (props) => <CustomColumnFilter {...props} />,
        render: (rowData) => {
            let shortenedName = rowData.RISKINSUREDNAME;
            if (rowData.RISKINSUREDNAME.length > 25) {
                shortenedName = `${shortenedName.slice(0, 23)} ...`
            }
            return shortenedName
        }},

    {title: "Type", field: "TRANSACTIONTYPE", filterComponent: (props) => <CustomColumnFilter {...props} />},
    {title: "Premium", field: "AMOUNT", type: "currency", render: (rowData) => {
            return floatToDollarsConverter.format(rowData.AMOUNT)
        }, filterComponent: (props) => <CustomColumnFilter {...props} />},

    {title: "Inception", field: "EFFECTIVEDATE", format: "MM/dd/yyyy", filterComponent: (props) => <CustomColumnFilter {...props} />,
        render: (rowData) => {
            return formatDate(new Date(rowData.EFFECTIVEDATE));
        }},

    {title: "Expiration", field: "EXPIRATIONDATE", format: "MM/dd/yyyy", filterComponent: (props) => <CustomColumnFilter {...props} />,
        render: (rowData) => {
            return formatDate(new Date(rowData.EFFECTIVEDATE));
        }},

    {title: "Batch", field: "BATCHID", type: "numeric", filterComponent: (props) => <CustomColumnFilter {...props} />},
    {title: "Submitted", field: "RECEIVEDATE", format: "MM/dd/yyyy", filterComponent: (props) => <CustomColumnFilter {...props} />,
        render: (rowData) => {
            return formatDate(new Date(rowData.EFFECTIVEDATE));
        }},

    {title: "Proc State", field: "PROCESSEDSTATE", headerStyle: {
            width: "10px",
            maxWidth: "calc(5px)"
        }, cellStyle: {textAlign: "center"}, filterComponent: (props) => <CustomColumnFilter {...props} />
       },

]

const CustomColumnFilter = (props) => {
    return (
        <FormControl variant="standard" sx={{width: "100%"}}>
            <Input
                onChange={(event) => {
                    props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                }}
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <FilterListIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

/////////  Column Helper Functions

const floatToDollarsConverter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}



