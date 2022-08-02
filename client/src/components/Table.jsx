import React, {useEffect, useRef, useState} from "react";
import MaterialTable from "@material-table/core";
import Data from "../data";
import RowPopover from "./Popover";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import {TablePagination,  useTheme} from "@mui/material";

import FilterListIcon from '@mui/icons-material/FilterList';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function Table({showData}) {
    const theme = useTheme();

    const [selectedRow, setSelectedRow] = useState(null);
    const [activeRowData, setActiveRowData] = useState({});
    const tableRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const [activeFilter, setActiveFilter] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => setAnchorEl(anchorRef?.current), 1)
    // }, [anchorRef])

    const handleClick = (e, rowData) => {
        setAnchorEl(e.currentTarget);
        setSelectedRow(rowData.tableData.id);
        setActiveRowData(rowData);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
        // {
        //     title: "Custom Add",
        //     field: "internal_action",
        //     render: () => (
        //             <TestButton editable={false}/>
        //         )
        // }
    ]

    const actions = [
        {
            icon: FilterListIcon,
            tooltip: "Filter List",
            isFreeAction: true,
            onClick: (event, rowData) => {
                setActiveFilter(!activeFilter);
            }

        },
        {
            icon: ViewHeadlineIcon,
            tooltip: "View Rows",
            isFreeAction: true,

        },
        {
            icon: MoreVertIcon,
            tooltip: 'Show Details',
            onClick: handleClick
        }
    ];

    function RowPopover({anchorEl}) {

        return (
            <div >
                {anchorEl && <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>}

            </div>
        );
    }

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

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
        rowStyle: (rowData) => ({
            backgroundColor:
                selectedRow === rowData.tableData.id ? theme.palette.success.light : theme.palette.background.paper
        }),
        exportAllData: true,
        exportMenu: [
            {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "newPDF"),
            },
            {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "newCSV"),
            },
        ],
        columnsButton: true,
        filtering: activeFilter,
    }

    return (
        <>
            <MaterialTable ref={tableRef} columns={columns} data={showData ? fields : []} title={""} localization={{header : {actions: ''}}} actions={actions} options={options} onRowClick={handleRowClick} components={{
                Pagination: (props) =>
                    <TablePagination
                        count={props.count}
                        page={props.page}
                        onPageChange={props.onPageChange}
                        rowsPerPage={props.rowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        onRowsPerPageChange={props.onRowsPerPageChange}
                    />,
            }}

            />
            <RowPopover anchorEl={anchorEl}/>
        </>

    )
}