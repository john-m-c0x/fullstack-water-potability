import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

//ChartJS.register used to init relevant chart elements
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function WaterQualityChart({ features }) {
  // Updated scale factors to normalize values to a similar range,
  // found that some values were too high or too low to be displayed on the chart
  const scaleFactors = {
    'pH': (value) => {
      // Simple linear scaling from 0-14 to 0-1.0
      value = Math.max(0, Math.min(14, value)); // Clamp pH between 0-14 first
      return value / 14;  // Maps 0->0.0, 7->0.5, 14->1.0 for reference
    },
    // rest of features are scaled as below, these values were found by trial and error
    // found from the sample data used in previous assignments 
    'Hardness': (value) => Math.min((value / 400) * 0.7 + 0.3, 1),
    'Solids': (value) => Math.min((value / 2000) * 0.7 + 0.3, 1),
    'Chloramines': (value) => Math.min((value / 6) * 0.7 + 0.3, 1),
    'Sulfate': (value) => Math.min((value / 400) * 0.7 + 0.3, 1),
    'Conductivity': (value) => Math.min((value / 1500) * 0.7 + 0.3, 1),
    'Organic Carbon': (value) => Math.min((value / 15) * 0.7 + 0.3, 1),
    'Trihalomethanes': (value) => Math.min((value / 100) * 0.7 + 0.3, 1),
    'Turbidity': (value) => Math.min((value / 7) * 0.7 + 0.3, 1)
  };

  // Define threshold values (before scaling)
  // Derived from EPA standards and guidelines
  const thresholdValues = {
    'pH': 8.5,         // Ideal pH
    'Hardness': 300,   // Upper limit for very hard water
    'Solids': 500,     // EPA secondary standard
    'Chloramines': 4,  // EPA maximum
    'Sulfate': 250,    // EPA secondary standard
    'Conductivity': 800, // Typical upper limit
    'Organic Carbon': 4,  // Typical treatment goal
    'Trihalomethanes': 80, // EPA maximum
    'Turbidity': 1     // EPA standard
  };

  const labels = ['pH', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 'Conductivity', 'Organic Carbon', 'Trihalomethanes', 'Turbidity'];
  
  // Scaling the features and thresholds using the scaleFactors
  const scaledFeatures = features.map((value, index) => 
    scaleFactors[labels[index]](value)
  );
  const scaledThresholds = labels.map(label => 
    scaleFactors[label](thresholdValues[label])
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Water Sample',
        data: scaledFeatures,
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(53, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(53, 162, 235)',
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Potability Threshold',
        data: scaledThresholds,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(0, 0, 0)',
          font: {
            color: 'rgb(0, 0, 0)'
          }
        }
      },
      title: {
        display: true,
        text: 'Water Quality Parameters',
        color: 'rgb(0, 0, 0)',
        font: {
          color: 'rgb(0, 0, 0)'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const datasetLabel = context.dataset.label;
            const index = context.dataIndex;
            const paramName = labels[index];
            
            if (datasetLabel === 'Your Water Sample') {
              const originalValue = features[index];
              const normalizedValue = context.raw;
              return `${datasetLabel}: ${originalValue.toFixed(2)} (Normalized: ${normalizedValue.toFixed(2)})`;
            } else {
              const originalValue = thresholdValues[paramName];
              const normalizedValue = context.raw;
              return `${datasetLabel}: ${originalValue.toFixed(2)} (Normalized: ${normalizedValue.toFixed(2)})`;
            }
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 1.0,
        ticks: {
          stepSize: 0.1,
          display: false,
          color: 'rgb(0, 0, 0)'
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          color: 'rgb(0, 0, 0)',
          font: {
            color: 'rgb(0, 0, 0)'
          }
        }
      }
    }
  };

  return (
    <Radar options={options} data={data} />
  );
}

export default WaterQualityChart;