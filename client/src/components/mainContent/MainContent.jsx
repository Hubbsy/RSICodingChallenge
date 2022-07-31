import React from "react";
import {Box, styled} from "@mui/material";

import Table from "./Table";

export default function MainContent() {

    const MainContentBox = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
    }))

    return (
       <MainContentBox>
           <Table/>
       </MainContentBox>
    )

}