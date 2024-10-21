import React from 'react';
import { Grid2, Typography } from '@mui/material';
import AboutCard from '../components/AboutCard';

import img_clarity from '../assets/images/img_clarity.jpg';
import img_swinburne from '../assets/images/img_swinburne.jpg';

function About() {
  return (
    <Grid2 container direction="column" spacing={4} justifyContent="center" alignItems="center" sx={{ paddingTop: "12vh" }}>
      <Grid2 item container direction="row" alignItems="center" justifyContent="space-between" sx={{width:"45%"}}>
      <Typography variant="h7" sx={{ flex: 1, textAlign: "left" }}>
          This is some default text explaining our project
        </Typography>
        <AboutCard primaryText="Our Project" secondaryText="AQUA.AI" description="Analysing Water" image={img_clarity} isLinkEnabled={false} sx={{ flex: 1 }}/>
      </Grid2>

      <Grid2 item container direction="row" alignItems="center" justifyContent="space-between" sx={{width:"45%"}}>
        <Typography variant="h7" sx={{ flex: 1, textAlign: "left" }}>
          This is some default text that will describe our team
        </Typography>
        <AboutCard primaryText="About Us" secondaryText="A Team At Swinburne" description="Creating Innovative AI Solutions" image={img_swinburne} isLinkEnabled={false} sx={{ flex: 1 }}/>
      </Grid2>
    </Grid2>
  );
}

export default About;