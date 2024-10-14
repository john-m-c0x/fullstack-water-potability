import React from 'react';
import { TextField, CircularProgress, Box } from '@mui/material';

//Text field with exposed parameters, includes circular progress that is enabled when 'loading' is true
const PromptInputField = ({ prompt, isReadOnly, loading, onPromptChange, onKeyDown }) => (
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
          marginTop: '-12px',
        }}
      />
    )}
  </Box>
);

export default PromptInputField;