import React, {useCallback, useState} from "react";

import MaterialTable from "@material-table/core";
import {CardHeader, CardContent, Typography, styled} from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {Popover, TablePagination, useTheme} from "@mui/material";

import {fields, getCompanyData} from "./tableDataManager";
import {columns} from "./Columns";
import anchorPositionByAnchorEl from "./anchorTool";

import FilterListIcon from '@mui/icons-material/FilterList';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import MoreVertIcon from "@mui/icons-material/MoreVert";


export default function Table({showData}) {
    const theme = useTheme();

    const [tableSize, setTableSize] = useState("normal");
    const [selectedRow, setSelectedRow] = useState(null);
    const [activeTableFilters, setActiveTableFilters] = useState(false);
    const [filterTooltip, setFilterTooltip] = useState("Show Filters");
    const [companyInfo, setCompanyInfo] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    const popoverOpen = Boolean(anchorEl);

    const handleRowClick = (event, selectedRow) => {
        setSelectedRow(selectedRow.tableData.id);
    }

    const handlePopoverOpen = useCallback(
        (event, data = null) => {
            setCompanyInfo(getCompanyData(data.AFFIDAVITNO));
            const anchorPosition = anchorPositionByAnchorEl(event);
            setAnchorEl(anchorPosition);
        },
        []
    );

    const handlePopoverClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    /////////// Actions array for table action icons

    const StyledMoreVertIcon = styled(MoreVertIcon)(({theme}) => ({
        height: 30,
        width: 18,
        color: "gray",
        "&:active": {
            height: 30,
            width: 18,
            borderRadius: "50%",
            backgroundColor: theme.palette.grid.main.active,
            padding: 0,
            color: "gray"
        },
        "&:focus": {
            height: 30,
            width: 18,
            borderRadius: "50%",
            backgroundColor: theme.palette.grid.main.active,
            padding: 0,
            color: "gray"
        }
    }))

    const actions = [
        {
            icon: FilterListIcon,
            tooltip: filterTooltip,
            isFreeAction: true,
            onClick: (event, rowData) => {
                setActiveTableFilters(!activeTableFilters);
                let newTooltip = filterTooltip === "Show Filters" ? "Hide Filters" : "Show Filters";
                setFilterTooltip(newTooltip);
            }

        },
        {
            icon: ViewHeadlineIcon,
            tooltip: "Toggle Density",
            isFreeAction: true,
            onClick: (event, rowData) => {
                // options.setTableProps(options);
                setTableSize("small");
            }

        },
        {
            icon: () => <StyledMoreVertIcon/>,
            tooltip: 'Toggle Details',
            sx: {
              color: "text.secondary",
            },
            onClick: (event, rowData) => {
                handleRowClick(event, rowData)
                handlePopoverOpen(event, rowData);
            }
        }
    ];

    /////////// Options object for table customization

    const options = {
        setTableProps: () => {
            return {
                size: "small",
            };
        },
        size: tableSize,
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
        filtering: activeTableFilters,
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
                    horizontal: "right"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus >
                <CardHeader
                    title={<Typography variant="subtitle2">Affidavit No {companyInfo.affidavitNo}</Typography>}
                    sx={{borderBottom: "solid lightgray 1px",
                        backgroundColor: theme.palette.background.default,
                        height: 5,
                        padding: "20px 25px 20px 10px",
                        whitespace: "nowrap"}}
                />
                <CardContent sx={{padding: "5px 15px 10px 15px !important"}}>
                    <Typography variant="subtitle2">Company(s):</Typography>
                    <Typography sx={{ textTransform: "uppercase", paddingBottom: "5px"}} variant="subtitle1">{`${companyInfo.CoNumber} - ${companyInfo.CoName}`}</Typography>
                    <Typography variant="subtitle2">Coverage:</Typography>
                    <Typography sx={{ textTransform: "uppercase"}} variant="subtitle1">{companyInfo.coverage}</Typography>
                </CardContent>
            </Popover>
        </>
    )
}