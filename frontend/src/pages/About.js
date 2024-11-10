import React from 'react';
import { Grid2, Typography, Fade } from '@mui/material';
import AboutCard from '../components/AboutCard';

import img_clarity from '../assets/images/img_clarity.jpg';
import img_swinburne from '../assets/images/img_swinburne.jpg';

function About() {
  return (
    <Fade in={true} timeout={800}>
      <Grid2 container direction="column" spacing={4} justifyContent="center" alignItems="center" sx={{ paddingTop: "12vh" }}>
        <Grid2 item container direction="row" alignItems="center" justifyContent="space-between" sx={{width:"45%"}}>
          <Typography variant="h7" sx={{ flex: 1, textAlign: "left" }}>
            AQUA.AI is an application that utilises AI to analyse and predict the potability
            of water based on specific water parameters given by the user. <br/>
            The totality of a semester-long project, this website demonstrates our ability to
            manage projects, develop front-end/back-end applications, and integrate AI into a full-stack web application.
          </Typography>
          <AboutCard primaryText="Our Project" secondaryText="AQUA.AI" description="Analysing Water" image={img_clarity} isLinkEnabled={false} sx={{ flex: 1 }}/>
        </Grid2>

        <Grid2 item container direction="row" alignItems="center" justifyContent="space-between" sx={{width:"45%"}}>
          <Typography variant="h7" sx={{ flex: 1, textAlign: "left" }}>
            We are a team at Swinburne University, passionate about computer science, 
            and each with our own diverse set of skills. <br/>
            We believe that by making water quality analysis easier to understand and more accessible, 
            we can help communities make better decisions about their water safety.
          </Typography>
          <AboutCard primaryText="About Us" secondaryText="A Team At Swinburne" description="Creating Innovative AI Solutions" image={img_swinburne} isLinkEnabled={false} sx={{ flex: 1 }}/>
        </Grid2>
      </Grid2>
    </Fade>
  );
}

export default About;