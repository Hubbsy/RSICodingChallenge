import React from "react";
import MaterialTable from "@material-table/core";
import Data from "../data";
import {TablePagination, useTheme} from "@mui/material";

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Table({showData}) {
    const theme = useTheme();

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

    const floatToDollarsConverter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })

    const columns = [
        {title: "Affidavit No", field: "AFFIDAVITNO"},
        {title: "Policy No", field: "POLICYNO"},
        {title: "Insured Name", field: "RISKINSUREDNAME", render: (rowData) => {
            let shortenedName = rowData.RISKINSUREDNAME;
            if (rowData.RISKINSUREDNAME.length > 25) {
                shortenedName = `${shortenedName.slice(0, 23)} ...`
            }
            return shortenedName
            }},
        {title: "Type", field: "TRANSACTIONTYPE"},
        {title: "Premium", field: "AMOUNT", render: (rowData) => {
                return floatToDollarsConverter.format(rowData.AMOUNT)
            }},
        {title: "inception", field: "EFFECTIVEDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Expiration", field: "EXPIRATIONDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Batch", field: "BATCHID", type: "numeric"},
        {title: "Submitted", field: "RECEIVEDATE", type: 'date', format: "mm/dd/yyyy"},
        {title: "Proc State", field: "PROCESSEDSTATE", headerStyle: {
                width: "10px",
                maxWidth: "calc(5px)"
            }, cellStyle: {textAlign: "center"}},
    ]

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
        {
            icon: MoreVertIcon,
            tooltip: 'Show Details',
            onClick: (event, rowData) => {
                // Do save operation
            }
        }
    ];

    const options = {
        pageSize: 10,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor:  theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: "capitalize",
            padding: 15,
        },
    }

    return (
        <MaterialTable columns={columns} data={showData ? fields : []} title={""} localization={{header : {actions: ''}}} actions={actions} options={options} components={{
            Pagination: (props) =>
                <TablePagination
                    count={props.count}
                    page={props.page}
                    onPageChange={props.onPageChange}
                    rowsPerPage={props.rowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    onRowsPerPageChange={props.onRowsPerPageChange}
                />
            }}
        />
    )
}