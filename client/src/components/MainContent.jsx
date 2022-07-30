import React from "react";
import {Box, styled} from "@mui/material";




export default function MainContent() {

    const MainContentBox = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.paper
    }))

    return (
       <MainContentBox>
           Main Content
       </MainContentBox>
    )

}