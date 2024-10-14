import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import PromptInputField from '../components/PromptInputField';
import PromptResponseField from '../components/PromptResponseField';

function Home() {
  const location = useLocation();

  //Sets passedPrompt to value sent from landing page, or '' if sate is null
  const {passedPrompt} = location.state || '';

  //The current text inputted into the input text field, set initally based on passedPrompt
  const [prompt, setPrompt] = useState(passedPrompt || '')

  //Properties for the prompt input text field
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  //Holds an array of responses from the AI to display in prompt response field
  const [responses, setResponses] = useState([]);

  //Barebones implementation for handling a prompt, at the moment this just simulates a call to API - to test UI
  const handlePrompt = () => {
    if (prompt !== '' && !loading)
    {
      setIsReadOnly(true)
      setLoading(true)

      setTimeout(() => {
        setResponses(prevResponses => [...prevResponses, `Response for: '${prompt}'`])
        setIsReadOnly(false);
        setLoading(false);
        setPrompt('');
      }, 2000);
    }
  }

  //Calls handlePrompt on first run if a prompt has been passed from landing page
  //Definitely could be a better implementation of this, useEffect was causing me problems, responses were firing twice
  const [firstRun, setFirstRun] = useState(true);
  if (passedPrompt && firstRun) {
    handlePrompt();
    setFirstRun(false);
  }

  //Handles key events
  const keyEvent = (event) => {
    if (event.key === "Enter")
    {
      handlePrompt();
    }
  }

  return (
    <Grid2 container spacing={2} sx={{ flexDirection:'column', height: '75vh', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Grid2 item xs={12} sx={{width:{xs: '90%', sm: '70%', md: '60%', lg: '40%'}}}>
        <PromptResponseField
          responses={responses}
        />
      </Grid2>
      <Grid2 item xs={12} sx={{width:{xs: '90%', sm: '70%', md: '60%', lg: '40%'}}}>
        <PromptInputField
          prompt={prompt}
          onKeyDown={keyEvent}
          onPromptChange={(e) => setPrompt(e.target.value)}
          loading={loading}
          isReadOnly={isReadOnly}
        />
      </Grid2>
    </Grid2>
  );
}

export default Home;