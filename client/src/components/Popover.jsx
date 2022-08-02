import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {useEffect, useRef, useState} from "react";
import {Button, styled} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const TestButton = (props) => {
    return (
        <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={props.handleClick}
            startIcon={<MoreVertIcon/>}
        >

        </Button>
    )
}

export default function RowPopover({ activeRowData, popoverRef }) {
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        setAnchorEl(popoverRef)
    }, [])

    const StyledMoreVertIcon = styled(MoreVertIcon)(({theme}) => ({
        height: 20,
        color: "gray",
        "&:hover": {
            height: 20,
            borderRadius: "50%",
            backgroundColor: theme.palette.grid.main.active,
            padding: 0,
            color: "text.secondary"
        }
    }))

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    // const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Popover
                // id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </div>
    );
}
