import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2, Typography, Fade, Paper } from '@mui/material';
import PromptInputField from '../components/PromptInputField';

function Landing() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  //The prompt to send to home page, automatically updated via PrompInputFields 'onPromptChange'
  const [prompt, setPrompt] = useState('');

  //Used to indicate the current value the user is typing
  //TODO: Need to update this with labels relevant to the dataset we are using
  const [currentIndex, setCurrentIndex] = useState(0);
  const labels = ['pH', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 'Conductivity', 'Organic Carbon', 'Trihalomethanes', 'Turbidity'];

  //Send the prompt via state to home page when user taps enter - with key 'passedPrompt' and value 'prompt'
  const passPromptToHome = (event) => {
    if (event.key === 'Enter') {
      setIsExiting(true);
      setTimeout(() => {
        navigate('/', {state: {passedPrompt: prompt}});
      }, 400); // Delay navigation to allow fade effect
    }
  };

  //Handle when the text in the prompt field changes
  const handlePromptChange = (e) => {
    //Set the prompt variable with the text in the text field
    const input = e.target.value;
    setPrompt(input);

    //Update current index based on the number of space-separated values
    const values = input.trim().split(' ');
    const index = Math.min(values.length, labels.length);
    setCurrentIndex(index);
  };

  return (
    <Fade in={!isExiting} timeout={400}>
      <Grid2 container spacing={4} direction='column' justifyContent='center' alignItems='center' sx={{height:'80vh'}}>
        <Grid2 item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h4' sx={{ marginBottom: 2 }}>
            Water Quality Analyzer
          </Typography>
          <Typography variant='h5' sx={{ marginBottom: 3, color: 'text.secondary' }}>
            Transforming data into clarity.
          </Typography>
        </Grid2>
        <Grid2 item xs={12} sx={{width:{xs: '90%', sm: '70%', md: '50%', lg: '40%'}}}>
          <PromptInputField
            prompt={prompt}
            onKeyDown={passPromptToHome}
            onPromptChange={handlePromptChange}
            labels={labels}
            currentIndex={currentIndex}
          />
        </Grid2>
      </Grid2>
    </Fade>
  );
}

export default Landing;