import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import PromptInputField from '../components/PromptInputField';
import PromptResponseField from '../components/PromptResponseField';
import { getPrediction } from '../services/api'; // import the API call function
import WaterQualityChart from '../components/WaterQualityChart';
import { motion } from 'framer-motion';
import TestDataButton from '../components/TestDataButton';

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

  //Used to indicate the current value the user is typing
  //TODO: Need to update this with labels relevant to the dataset we are using
  const [currentIndex, setCurrentIndex] = useState(0);
  const labels = ['pH', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 'Conductivity', 'Organic Carbon', 'Trihalomethanes', 'Turbidity'];

  // Add this new state variable with the other state declarations
  const [chartFeatures, setChartFeatures] = useState(Array(9).fill(0));

  //Make a call to the back-end to get a response from the model
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const features = prompt.trim().split(' ').map(parseFloat);
      console.log("Features being sent:", features, features.length);  // Debug log
      
      if (features.length !== 9 || features.some(isNaN)) {
        setResponses((prev) => [...prev, 'Error: Please enter exactly 9 numerical values']);
        setLoading(false);
        return;
      }

      // Update chart features
      setChartFeatures(features);

      // Multiply the last two features before sending to the backend
      const compositeFeature = features[7] * features[8]; // Multiplying Turbidity and Trihalomethanes
      const inputData = [...features.slice(0, 7), compositeFeature]; // Prepare data with composite feature
      
      console.log("Data being sent to backend:", inputData);  // Debug log
      
      const response = await getPrediction(inputData);
      console.log("Response from backend:", response);  // Debug log
      
      const potableText = response.potability ? 'This water is potable' : 'This water is not potable';
      setResponses(prevResponses => [...prevResponses, `Result: ${potableText}`]);

    } catch (err) {
      console.error("Detailed error:", err);  // More detailed error logging
      setResponses(prevResponses => [...prevResponses, `Error: ${err.message || err}`])
    } finally {
      setLoading(false);
    }
  };

  //DEPRECIATED: (use handleSubmit instead)... But keeping it here just in case UI still has to be tested.
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
        setCurrentIndex(0);
      }, 2000);
    }
  }

  //Handles key events
  const keyEvent = (event) => {
    if (event.key === 'Enter')
    {
      handleSubmit();
    }
  }

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

  //Calls handlePrompt on first run if a prompt has been passed from landing page
  //Definitely could be a better implementation of this, useEffect was causing me problems, responses were firing twice
  const [firstRun, setFirstRun] = useState(true);
  if (passedPrompt && firstRun) {
    handlePromptChange({ target: { value: passedPrompt } });
    handleSubmit();
    setFirstRun(false);
  }

  const handleTestDataGenerated = (data) => {
    setPrompt(data);
    handleSubmit();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '2rem'
      }}
    >
      <Grid2 
        container 
        direction="column" 
        alignItems="center" 
        spacing={2}
        sx={{ 
          maxWidth: {xs: '90%', sm: '70%', md: '60%', lg: '40%'},
        }}
      >
        <Grid2 item xs={12} sx={{ width: '100%' }}>
          <PromptResponseField
            responses={responses}
          />
        </Grid2>
        
        <Grid2 item xs={12} sx={{ width: '100%' }}>
          <PromptInputField
            prompt={prompt}
            onKeyDown={keyEvent}
            onPromptChange={handlePromptChange}
            loading={loading}
            isReadOnly={isReadOnly}
            labels={labels}
            currentIndex={currentIndex}
          />
        </Grid2>
        
        <Grid2 item xs={12} sx={{ width: '100%', marginTop: 2 }}>
          <TestDataButton onDataGenerated={handleTestDataGenerated} />
        </Grid2>
        
        <Grid2 item xs={12} sx={{ width: '100%', marginTop: 4 }}>
          <WaterQualityChart features={chartFeatures} />
        </Grid2>
      </Grid2>
    </motion.div>
  );
}

export default Home;