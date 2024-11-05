from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Initialize FastAPI
app = FastAPI()

# Enable CORS for your frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Load the saved model using joblib
model = joblib.load("trained_svm_model.pkl")
scaler = joblib.load('scaler.pkl')

# Define the input data structure
class WaterData(BaseModel):
    input1: float
    input2: float
    input3: float
    input4: float
    input5: float
    input6: float
    input7: float
    input8: float

# Define a prediction endpoint
@app.post("/predict")
async def predict_potability(data: WaterData):
    try:
        # Convert input data to the format expected by the model
        input_data = np.array([
            data.input1,
            data.input2,
            data.input3,
            data.input4,
            data.input5,
            data.input6,
            data.input7,
            data.input8,
        ]).reshape(1, -1)  # Reshape to 2D array for a single prediction

        # Preprocess the entered data
        data_scaled = scaler.transform(input_data)

        # Make a prediction
        prediction = model.predict(data_scaled)

        # Map the model output to a human-readable format
        is_potable = bool(prediction[0])  # Assuming 1 = potable, 0 = non-potable

        return {"potability": is_potable}

    except Exception as e:
        # Handle errors in prediction
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

