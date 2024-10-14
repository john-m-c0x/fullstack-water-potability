import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import PromptInputField from '../components/PromptInputField';

function Home() {
  const location = useLocation();

  //Sets passedPrompt to value sent from landing page, or '' if sate is null
  const {passedPrompt} = location.state || '';
  const [prompt, setPrompt] = useState(passedPrompt || '')

  return (
    <Grid2 container spacing={2} sx={{ flexDirection:'column', height: '75vh', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Grid2 item xs={12} sx={{width:{xs: '90%', sm: '70%', md: '60%', lg: '40%'}}}>
        <PromptInputField
          prompt={prompt}
        />
      </Grid2>
    </Grid2>
  );
}

export default Home;