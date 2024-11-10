import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

function TestDataButton({ onDataGenerated }) {
  const [totalRows, setTotalRows] = useState(0);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    // Load the CSV file and count rows
    fetch('/cleaned_water_potability.csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').length - 2; // -2 for header and last empty line
        setTotalRows(rows);
      });
  }, []);

  const generateTestData = async () => {
    try {
      const response = await fetch('/cleaned_water_potability.csv');
      const data = await response.text();
      const rows = data.split('\n').filter(row => row.trim()); // Remove empty lines
      const header = rows[0];
      
      // Generate random row number (excluding header)
      const randomRowIndex = Math.floor(Math.random() * (rows.length - 1)) + 1;
      const selectedRow = rows[randomRowIndex];
      
      // Split the row into values, remove potability, and format to 2 decimal places
      const values = selectedRow.split(',')
        .slice(0, -1)  // Remove potability
        .map(value => Number(parseFloat(value).toFixed(2))); // Format to 2 decimal places
      
      // Update the current row number
      setCurrentRow(randomRowIndex);
      
      // Pass the values to parent component
      onDataGenerated(values.join(' '));
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Button 
        onClick={generateTestData}
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          backgroundColor: '#4CAF50',
          '&:hover': {
            backgroundColor: '#45a049'
          }
        }}
      >
        Generate Test Data
      </Button>
      {currentRow && (
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          Data from row {currentRow} of {totalRows}
        </Typography>
      )}
    </Box>
  );
}

export default TestDataButton; 