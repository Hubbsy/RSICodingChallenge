import React, {useCallback, useState} from "react";

import MaterialTable from "@material-table/core";
import {
    CardHeader,
    CardContent,
    Typography,
    styled,
    FormControl,
    Input,
    InputAdornment
} from "@mui/material";

import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {Popover, TablePagination, useTheme} from "@mui/material";

import {fields, getCompanyData} from "./tableDataManager";
import anchorPositionByAnchorEl from "./anchorTool";
import {floatToDollarsConverter, formatDate} from "./columnHelpers"

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

        }
    ];

    /////////// Columns array for columns rendering

    const columns = [
        {
            title: "Affidavit No",
            field: "AFFIDAVITNO",
            filterComponent: (props) => <CustomColumnFilter {...props} />},

        {
            title: "Policy No",
            field: "POLICYNO",
            filterComponent: (props) => <CustomColumnFilter {...props} />},
        {
            title: "Insured Name",
            field: "RISKINSUREDNAME",
            filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                let shortenedName = rowData.RISKINSUREDNAME;
                if (rowData.RISKINSUREDNAME.length > 25) {
                    shortenedName = `${shortenedName.slice(0, 23)} ...`
                }
                return shortenedName
            }},

        {
            title: "Type",
            field: "TRANSACTIONTYPE",
            filterComponent: (props) => <CustomColumnFilter {...props} />},
        {
            title: "Premium",
            field: "AMOUNT",
            type: "currency",
            align: "left",
            render: (rowData) => {
                return floatToDollarsConverter.format(rowData.AMOUNT)
            }, filterComponent: (props) => <CustomColumnFilter {...props} />},

        {
            title: "Inception",
            field: "EFFECTIVEDATE",
            filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return formatDate(new Date(rowData.EFFECTIVEDATE));
            }},

        {
            title: "Expiration",
            field: "EXPIRATIONDATE",
            filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return formatDate(new Date(rowData.EFFECTIVEDATE));
            }},

        {
            title: "Batch",
            field: "BATCHID",
            type: "numeric",
            align: "left",
            filterComponent: (props) => <CustomColumnFilter {...props} />},
        {
            title: "Submitted",
            field: "RECEIVEDATE",
            filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return formatDate(new Date(rowData.EFFECTIVEDATE));
            }},

        {
            title: "Proc State",
            field: "PROCESSEDSTATE",
            headerStyle: {
                textAlign: "left",
                whiteSpace: "break-spaces"
            },
            cellStyle: {
                textAlign: "center",
            },
            align: "center",
            filterComponent: (props) => <CustomColumnFilter {...props} />,
            render: (rowData) => {
                return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <span style={{display: "flex", width: "50%"}}>{rowData.PROCESSEDSTATE}</span>
                    <StyledMoreVertIcon  onClick={event => handlePopoverOpen(event, rowData)}/>
                </div>
            }
        },

    ]

    const StyledMoreVertIcon = styled(MoreVertIcon)(({theme}) => ({
        height: 30,
        width: 18,
        display: "flex",
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
        },
    }))

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
            // padding: 15,
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
                                    />,
                           }}

            />
            {/*Popover used on row icon click for company info based on row data*/}

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