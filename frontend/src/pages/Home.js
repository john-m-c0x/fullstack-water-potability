import React, { useState } from 'react';
import { getPrediction } from '../api'; // import the API call function

const Home = () => {
    const [features, setFeatures] = useState(Array(8).fill(0)); // Initialize 8 inputs
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
            const response = await getPrediction(features);
            // Access the potability key from the response
            setPrediction(response.potability); // Change this line to match the backend response structure
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Predictor</h2>
            <form onSubmit={handleSubmit}>
                {features.map((feature, index) => (
                    <input
                        key={index}
                        type="number"
                        step="0.01"
                        value={feature}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        placeholder={`Input ${index + 1}`}
                    />
                ))}
                <button type="submit">Get Prediction</button>
            </form>
            {prediction !== null && <p>Prediction: {prediction ? 'Potable' : 'Not Potable'}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default Home;
