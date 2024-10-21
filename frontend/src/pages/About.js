import React from 'react';
import { Grid2, Typography } from '@mui/material';
import AboutCard from '../components/AboutCard';

//import swinLogo from '../assets/images/img_clarity';

function About() {
  return (
    <Grid2 container direction="column" spacing={4} justifyContent="center" alignItems="center" sx={{ paddingTop: "8vh" }}>
      <Grid2 item direction="row" alignItems="center" justifyContent="space-between" sx={{width:"45%"}}>
      <Typography variant="h7" sx={{ flex: 1, textAlign: "left" }}>
          This is some default text explaining our project
        </Typography>
        <AboutCard primaryText="Our Project" secondaryText="AQUA.AI" description="Analysing Water" isLinkEnabled={false} sx={{ flex: 1 }}/>
      </Grid2>
    </Grid2>
  );
}

export default About;