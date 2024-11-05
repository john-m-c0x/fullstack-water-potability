import axios from 'axios';

export const getPrediction = async (features) => {
    try {
        const inputData = {
            input1: features[0],
            input2: features[1],
            input3: features[2],
            input4: features[3],
            input5: features[4],
            input6: features[5],
            input7: features[6],
            input8: features[7],
        };

        const response = await axios.post('http://localhost:8000/predict', inputData);
        return response.data;
    } catch (error) {
        console.error('Error in getPrediction:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get prediction');
    }
};
