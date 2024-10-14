import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2, Typography } from '@mui/material';
import PromptInputField from '../components/PromptInputField';

function Landing() {
  const naviagte = useNavigate();

  //The prompt to send to home page, automatically updated via PrompInputFields 'onPromptChange'
  const [prompt, setPrompt] = useState('');

  //Send the prompt via state to home page when user taps enter - with key 'passedPrompt' and value 'prompt'
  const passPromptToHome = (event) => {
    if (event.key === "Enter") {
      naviagte('/Home', {state: {passedPrompt: prompt}});
    }
  };

  return (
    <Grid2 container spacing={12} direction="column" justifyContent="center" alignItems="center" sx={{height:"60vh"}}>
      <Grid2 item xs={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Typography variant="h5">
          Transforming data into clarity.
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sx={{width:{xs: '90%', sm: '70%', md: '50%', lg: '40%'}}}>
        <PromptInputField
          prompt={prompt}
          onKeyDown={passPromptToHome}
          onPromptChange={(e) => setPrompt(e.target.value)}
        />
      </Grid2>
    </Grid2>
  );
}

export default Landing;