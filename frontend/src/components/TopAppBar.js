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
          to="/"
          sx={{
            position: 'absolute',
            left: 24,
            textDecoration: 'none',
            color: 'inherit',
            textTransform: 'lowercase',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          aqua.ai
        </Typography>
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Button
            color="inherit"
            component={Link}
            to="/home"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/data"
          >
            Data
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar; 