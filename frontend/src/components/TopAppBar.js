import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const TopAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/landing"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 0
          }}
        >
          AQUA.AI
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem'
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
          >
            About
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/data"
          >
            Data
          </Button>
        </Box>
        <Box sx={{ flexGrow: 0 }} />
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar; 