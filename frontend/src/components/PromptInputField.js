import React from 'react';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';

//Text field with exposed parameters, includes circular progress that is enabled when 'loading' is true
const PromptInputField = ({ prompt, isReadOnly, loading, onPromptChange, onKeyDown, labels, currentIndex }) => (
  <Box sx={{ position: 'relative' }}>
    <TextField
      variant="outlined"
      label="Prompt"
      value={prompt}
      onKeyDown={onKeyDown}
      onChange={onPromptChange}
      InputProps={{ readOnly: isReadOnly }}
      fullWidth
    />
    {loading && (
      <CircularProgress
        size={24}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 8,
          marginTop: '-24px',
        }}
      />
    )}
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
      {labels.map((label, index) => (
        <Typography
          key={label}
          variant="body2"
          sx={{
            color: index < currentIndex ? 'green' : 'grey',
            marginRight: 2,
            fontWeight: index === currentIndex ? 'bold' : 'normal',
          }}
        >
        {label}
        </Typography>
      ))}
    </Box>
  </Box>
);

export default PromptInputField;