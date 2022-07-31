import React from "react";
import MaterialTable from "@material-table/core";
import Data from "../data";
import {TablePagination, useTheme} from "@mui/material";

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

export default function Table({showData}) {

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

    const columns = [
        {title: "Affidavit No", field: "AFFIDAVITNO"},
        {title: "Policy No", field: "POLICYNO"},
        {title: "Insured Name", field: "RISKINSUREDNAME"},
        {title: "Type", field: "TRANSACTIONTYPE"},
        {title: "Premium", field: "AMOUNT"},
        {title: "inception", field: "EFFECTIVEDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Expiration", field: "EXPIRATIONDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Batch", field: "BATCHID", type: "numeric"},
        {title: "Submitted", field: "RECEIVEDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Proc State", field: "PROCESSEDSTATE"},
    ]

    const fields = Data.map((record) => {
        let transaction = record.PARTA_TRANSACTION;
        let mappedData = {};
        for (let key in transaction) {

            if (tableFields.hasOwnProperty(key)) {
                if (transaction[key] === null) {
                    mappedData[key] = "N/A";
                }
                else {
                    mappedData[key] = transaction[key];
                }
            }
        }

        return mappedData
    });

    const actions = [
        {
            icon: ViewColumnIcon,
            tooltip: "View Columns",
            isFreeAction: true,
            onClick: (e) => {
                alert("how about it!")
            }
        },
        {
            icon: SaveAltIcon,
            tooltip: "Export",
            isFreeAction: true,
            onClick: (e) => {
                alert("how about it!")
            }
        },
        {
            icon: FilterListIcon,
            tooltip: "Filter List",
            isFreeAction: true,
            onClick: (e) => {
                alert("how about it!")
            }
        },
        {
            icon: ViewHeadlineIcon,
            tooltip: "View Rows",
            isFreeAction: true,
            onClick: (e) => {
                alert("how about it!")
            }
        },
    ];

    const theme = useTheme();
    const options = {
        headerStyle: {
            backgroundColor:  theme.palette.secondary.dark,
            color: theme.palette.background.paper,
            textTransform: "capitalize",
            padding: 15
        },

        showEmptyDataSourceMessage: true,
    }

    return (
        <MaterialTable columns={columns} data={showData ? fields : []} title={""} actions={actions} options={options} components={{
            Pagination: (props) =>
                <TablePagination
                    count={props.count}
                    page={props.page}
                    onPageChange={props.onPageChange}
                    rowsPerPage={props.rowsPerPage}
                    onRowsPerPageChange={props.onRowsPerPageChange}
                />
        }}/>
    )
}