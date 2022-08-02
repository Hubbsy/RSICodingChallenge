import React, {useCallback, useState} from "react";
import MaterialTable from "@material-table/core";
import {fields} from "./tableDataManager";
import {columns} from "./Columns";

import anchorPositionByAnchorEl from "./anchorTools";

import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {Popover, TablePagination, useTheme} from "@mui/material";

import FilterListIcon from '@mui/icons-material/FilterList';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Table({showData}) {
    const theme = useTheme();

    const [selectedRow, setSelectedRow] = useState(null);
    const [activeFilter, setActiveFilter] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

    const handlePopoverOpen = useCallback(
        (event, data = null) => {
            console.log(data)
            const anchorPosition = anchorPositionByAnchorEl(event);
            setAnchorEl(anchorPosition);

        },
        []
    );

    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

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
                options.setTableProps(options);
            }

        },
        {
            icon: MoreVertIcon,
            tooltip: 'Toggle Details',
            onClick: (event, rowData) => {
                handleRowClick(event, rowData)
                handlePopoverOpen(event, rowData);
            }
        }
    ];

    /////////// Options object for table customization

    const options = {
        setTableProps: (options) => {
            return {
                size: 'small',
            };
        },
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

    return (
        <>
            <MaterialTable title={""}
                           columns={columns} data={showData ? fields : []}
                           localization={{header : {actions: ''}}}
                           actions={actions}
                           options={options}
                           onRowClick={handleRowClick}
                           components={{
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
            <Popover
                id="descriptionPopover"
                open={popoverOpen}
                anchorReference="anchorPosition"
                anchorPosition={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus

            >
                FUXKINFG YES!!!!!!
            </Popover>
        </>

    )
}