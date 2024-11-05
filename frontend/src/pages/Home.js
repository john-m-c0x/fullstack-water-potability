import React, { useState } from 'react';
import { getPrediction } from '../api'; // import the API call function

const Home = () => {
    const [features, setFeatures] = useState(Array(9).fill(0)); // Initialize 9 inputs
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (index, value) => {
        const newFeatures = [...features];
        newFeatures[index] = parseFloat(value); // Convert input to a float
        setFeatures(newFeatures);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setError(null);
        try {
            // Multiply the last two features before sending to the backend
            const compositeFeature = features[7] * features[8]; // Multiplying Turbidity and Trihalomethanes
            const inputData = [...features.slice(0, 7), compositeFeature]; // Prepare data with composite feature

            const response = await getPrediction(inputData);
            // Access the potability key from the response
            setPrediction(response.potability); // Change this line to match the backend response structure
        } catch (err) {
            setError(err.message);
        }
    };

    // Define the titles for each input
    const titles = [
        'pH',
        'Hardness',
        'Solids',
        'Chloramines',
        'Sulfate',
        'Conductivity',
        'Organic Carbon',
        'Trihalomethanes',
        'Turbidity',
    ];

    return (
        <div>
            <h2>Predictor</h2>
            <form onSubmit={handleSubmit}>
                {features.map((feature, index) => (
                    <div key={index}>
                        <label>
                            {titles[index]}:
                            <input
                                type="number"
                                step="0.01"
                                value={feature}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder={`Enter ${titles[index]}`}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit">Get Prediction</button>
            </form>
            {prediction !== null && <p>Prediction: {prediction ? 'Potable' : 'Not Potable'}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default Home;
