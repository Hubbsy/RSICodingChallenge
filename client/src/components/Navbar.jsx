import React from "react";
import {Box, Breadcrumbs, Link, styled, Typography} from "@mui/material";
import {Home} from '@mui/icons-material';

export default function Navbar() {

    const NavbarBox= styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.default
    }))

    return (
        <NavbarBox>
            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <Home fontSize="inherit" />
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        Inquiry
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/material-ui/react-breadcrumbs/"
                        aria-current="page"
                    >
                        Affidavits
                    </Link>
                </Breadcrumbs>
            </div>
        </NavbarBox>
    )
}