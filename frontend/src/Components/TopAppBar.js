import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';

export default function TopAppBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                    <Button variant="text" color="inherit">Page1</Button>
                    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:{xs:2, sm:10, md:20, lg:35}}}>
                        <Button variant="text" color="inherit">Page2</Button>
                        <Button variant="text" color="inherit">Page3</Button>
                        <Button variant="text" color="inherit">Page4</Button>
                    </Box>
                    <Box sx={{ width: "50px" }}></Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}