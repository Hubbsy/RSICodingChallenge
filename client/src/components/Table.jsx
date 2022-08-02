import React, {useState} from "react";
import MaterialTable from "@material-table/core";
import Data from "../data";

import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {FormControl, Input, InputAdornment, TablePagination, useTheme} from "@mui/material";

import FilterListIcon from '@mui/icons-material/FilterList';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Table({showData}) {
    const theme = useTheme();

    const [selectedRow, setSelectedRow] = useState(null);
    const [activeFilter, setActiveFilter] = useState(false);

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

    /////////// Process Data for Column Fields

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

    /////////// Actions array for table action icons

    const actions = [
        {
            icon: FilterListIcon,
            tooltip: "Show Filters",
            isFreeAction: true,
            onClick: (event, rowData) => {
                setActiveFilter(!activeFilter);
            }

        },
        {
            icon: ViewHeadlineIcon,
            tooltip: "Toggle Density",
            isFreeAction: true,
            onClick: (event, rowData) => {
                options.setTableProps();
            }

        },
        {
            icon: MoreVertIcon,
            tooltip: 'Toggle Details',
            onClick: (event, rowData) => {

            }
        }
    ];

    /////////// Options object for table customization

    const options = {
        setTableProps: () => {
            console.log("setting Props!!!!")
            return {
                size: 'small',
            };
        },
        size: "medium",
        pageSize: 10,
        showEmptyDataSourceMessage: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor:  theme.palette.grid.main.header,
            color: theme.palette.background.paper,
            textTransform: "capitalize",
            padding: 15,
        },
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow === rowData.tableData.id ? theme.palette.success.light : theme.palette.background.paper
        }),
        exportAllData: true,
        exportMenu: [
            {
                label: "Export as PDF",
                exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "RSIData"),
            },
            {
                label: "Export as CSV",
                exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "RSIData"),
            },
        ],
        columnsButton: true,
        filtering: activeFilter,
    }

    /////////// Columns Rendering and helpers

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

    const floatToDollarsConverter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    })

    const columns = [
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
                return new Date(rowData.EFFECTIVEDATE).toLocaleDateString("en-us");
            }},

        {title: "Expiration", field: "EXPIRATIONDATE", format: "MM/dd/yyyy", filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return new Date(rowData.EFFECTIVEDATE).toLocaleDateString("en-us");
            }},

        {title: "Batch", field: "BATCHID", type: "numeric", filterComponent: (props) => <CustomColumnFilter {...props} />},
        {title: "Submitted", field: "RECEIVEDATE", format: "MM/dd/yyyy", filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return new Date(rowData.EFFECTIVEDATE).toLocaleDateString("en-us");
            }},

        {title: "Proc State", field: "PROCESSEDSTATE", headerStyle: {
                width: "10px",
                maxWidth: "calc(5px)"
            }, cellStyle: {textAlign: "center"}, filterComponent: (props) => <CustomColumnFilter {...props} />},

    ]

    return (
        <>
            <MaterialTable columns={columns} data={showData ? fields : []} title={""} localization={{header : {actions: ''}}} actions={actions} options={options} onRowClick={handleRowClick} components={{
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
        </>

    )
}