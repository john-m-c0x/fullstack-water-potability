import React from 'react';
import { Grid2, Typography, Card, CardContent, CardActions, Button, Fade, Link, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LaunchIcon from '@mui/icons-material/Launch';
import WarningIcon from '@mui/icons-material/Warning';

function Data() {
  const datasets = [
    {
      title: "Cleaned Water Quality Dataset",
      description: "A cleaned and preprocessed dataset ready for analysis. This dataset has been filtered to remove incomplete entries and standardized for use with the Water Quality Analyzer.",
      fileName: "cleaned_water_potability.csv",
      filePath: "/cleaned_water_potability.csv",
      author: "Asher Nagel",
      isCleaned: true
    },
    {
      title: "Raw Dataset 1 (Uncleaned)",
      description: "Raw water quality parameters from a comprehensive study. Warning: Contains missing values and requires preprocessing.",
      fileName: "water_potability1.csv",
      filePath: "/water_potability1.csv",
      author: "UOM190346A",
      sourceUrl: "https://www.kaggle.com/datasets/uom190346a/water-quality-and-potability?resource=download",
      isCleaned: false
    },
    {
      title: "Raw Dataset 2 (Uncleaned)",
      description: "Alternative raw water quality measurements. Warning: Contains missing values and requires preprocessing.",
      fileName: "water_potability2.csv",
      filePath: "/water_potability2.csv",
      author: "Aditya Kadiwal",
      sourceUrl: "https://www.kaggle.com/datasets/adityakadiwal/water-potability",
      isCleaned: false
    }
  ];

  const handleDownload = (dataset) => {
    const element = document.createElement("a");
    element.href = dataset.filePath;
    element.download = dataset.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Fade in={true} timeout={800}>
      <Grid2 
        container 
        spacing={4} 
        sx={{ 
          padding: { xs: 2, sm: 4 },
          maxWidth: '1200px',  // Constrain maximum width
          margin: '0 auto',    // Center the container
          paddingTop: '2rem'   // Add some top spacing
        }}
      >
        {/* Header section */}
        <Grid2 item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Sample Datasets
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ marginBottom: 3 }}
          >
            Use these example datasets to test the Water Quality Analyzer. The cleaned dataset is recommended for best results.
          </Typography>
        </Grid2>
        
        {/* Dataset cards */}
        {datasets.map((dataset, index) => (
          <Grid2 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index}
            sx={{ display: 'flex' }}  // Ensure equal height cards
          >
            <Card 
              sx={{ 
                width: '100%',
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1,
                padding: 3,    // Increase internal padding
              }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    marginBottom: 2,
                    minHeight: '64px'  // Ensure consistent title height
                  }}
                >
                  <WaterDropIcon color={dataset.isCleaned ? "primary" : "warning"} />
                  {dataset.title}
                </Typography>
                {!dataset.isCleaned && (
                  <Chip
                    icon={<WarningIcon />}
                    label="Uncleaned Data"
                    color="warning"
                    size="small"
                    sx={{ marginBottom: 2 }}
                  />
                )}
                <Typography variant="body2" color="text.secondary" paragraph>
                  {dataset.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Author: {dataset.author}
                </Typography>
              </CardContent>
              <CardActions sx={{ 
                justifyContent: 'space-between', 
                padding: 3,
                paddingTop: 0
              }}>
                <Button 
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(dataset)}
                  color={dataset.isCleaned ? "primary" : "warning"}
                >
                  Download Dataset
                </Button>
                {dataset.sourceUrl && (
                  <Link
                    href={dataset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    <LaunchIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                      Source
                    </Typography>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Fade>
  );
}

export default Data;