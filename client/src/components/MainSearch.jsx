import React from "react";
import {Box, Button, Container, InputBase, Paper, styled, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function MainSearch() {

    const SearchBox = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        padding: "15px 10px 15px 20px",
    }))

    const SearchBar = styled("div")(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
        borderBottom: "solid 0.5px black"
    }))

    return (
        <SearchBox variant={"outlined"}>

            <Typography variant={"h6"}>Affidavit Inquiry</Typography>
            <Typography color={"text.secondary"} variant={"caption"}>Search by Affidavit No, Policy No, Batch No, or Insured Name...</Typography>

            <Box sx={{justifyContent: "start", display: "flex"}}>
                <SearchBar sx={{width: {xs: "65%", sm: "40%"}}}>
                    <InputBase startAdornment={<SearchIcon sx={{color: "text.secondary"}}/>}/>
                </SearchBar>
                <Button sx={{marginLeft: 3}} color={"secondary"} variant={"outlined"} startIcon={<ManageSearchIcon/>}>Search</Button>
            </Box>
        </SearchBox>
    )
}