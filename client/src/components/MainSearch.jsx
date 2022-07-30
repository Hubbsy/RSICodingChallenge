import React from "react";
import {Box, styled} from "@mui/material";
import {useTheme} from "@mui/material/styles";




export default function MainSearch() {

    const SearchBox = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.paper
    }))

    return (
        <SearchBox>Main Search</SearchBox>
    )
}