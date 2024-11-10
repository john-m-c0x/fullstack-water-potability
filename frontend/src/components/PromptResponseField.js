import React from 'react';
import { TextField } from '@mui/material';

const PromptResponseField = ({ responses, rows = 15 }) => (
  <TextField
    variant='outlined'
    multiline
    rows={rows}
    value={responses.join('\n')}
    InputProps={{ readOnly: true }}
    fullWidth
  />
);

export default PromptResponseField;