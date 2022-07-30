import React from "react";
import {Box, styled} from "@mui/material";

import Toolbar from "./subContent/Toolbar";

export default function MainContent() {

    const MainContentBox = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.paper,
    }))

    return (
       <MainContentBox>
           <Toolbar />
       </MainContentBox>
    )

}