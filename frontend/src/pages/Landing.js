import React from 'react';
import { Grid2, Typography, TextField } from '@mui/material';

function Landing() {
  return (
    <Grid2 container spacing={12} direction="column" justifyContent="center" alignItems="center" sx={{height:"60vh"}}>
      <Grid2 item xs={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Typography variant="h5">
          Transforming data into clarity.
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
        <TextField variant="outlined" label="Prompt" sx={{width:{xs: '90%', sm: '70%', md: '50%', lg: '40%'}}}/>
      </Grid2>
    </Grid2>
  );
}

export default Landing;