import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';

//Default button style
const buttonStyle = {
    color: 'inherit',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
};

//Gives button a background for current page
const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
};

export default function TopAppBar() {
    //Get current location, used for setting button style to active if button is associated with current location
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                    <Button component={Link} to="/" sx={location.pathname==='/' ? activeButtonStyle : buttonStyle}>
                        <Typography variant="h6" sx={{fontWeight:"bold"}}>
                            AQUA.AI
                        </Typography>
                    </Button>
                    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:{xs:2, sm:10, md:20, lg:35}}}>
                        <Button component={Link} to="/Home" sx={location.pathname==='/Home' ? activeButtonStyle : buttonStyle}>Home</Button>
                        <Button component={Link} to="/About" sx={location.pathname==='/About' ? activeButtonStyle : buttonStyle}>About</Button>
                        <Button component={Link} to="/Data" sx={location.pathname==='/Data' ? activeButtonStyle : buttonStyle}>Data</Button>
                    </Box>
                    <Box sx={{ width: "50px" }}></Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}