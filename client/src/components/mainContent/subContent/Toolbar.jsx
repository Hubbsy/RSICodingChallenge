import React from "react";
import {Box, InputBase, Paper, styled} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

export default function Toolbar() {

    const ToolbarContent = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
        overflow: "none",
    }))

    const SearchBar = styled("div")(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        borderBottom: "solid 1.5px lightgray",
        marginRight: 20
    }))

    const ToolBox = styled(Box)(({theme}) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }))

    return (
        <ToolbarContent elevation={2}>
            <SearchBar sx={{width: {xs: "50%", sm: "25%"}} }>
                <InputBase fullWidth={true} placeholder={"Search"} startAdornment={<SearchIcon sx={{color: "text.secondary", marginRight: 1}}/>} endAdornment={<CloseIcon sx={{color: "text.secondary"}} fontSize={"small"}/>}/>
            </SearchBar>
            <ToolBox sx={{width: {xs: "30%", sm: "15%"}, color: "text.secondary"} }>
                <ViewColumnIcon  />
                <SaveAltIcon/>
                <FilterListIcon/>
                <ViewHeadlineIcon/>
            </ToolBox>
        </ToolbarContent>

    )

}