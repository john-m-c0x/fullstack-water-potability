from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import List
import os

# Initialize FastAPI
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the current directory path
current_dir = os.path.dirname(os.path.abspath(__file__))

# Loading model and scaler files, had some issues exacting when launching virtual environment
# so this function is used to load the files from the current directory
try:
    model_path = os.path.join(current_dir, "trained_svm_model.pkl")
    scaler_path = os.path.join(current_dir, "scaler.pkl")
    
    print(f"Looking for model at: {model_path}")  # Debug print
    print(f"Looking for scaler at: {scaler_path}")  # Debug print
    
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

except Exception as e:
    print(f"Error loading model files: {e}")
    raise

# Update the input data structure to accept an array of features
class WaterData(BaseModel):
    features: List[float]

# Define the prediction endpoint
@app.post("/predict")
async def predict_potability(data: WaterData):
    try:
        # Validate that we have exactly 8 features
        if len(data.features) != 8:
            raise HTTPException(
                status_code=400, 
                detail="Exactly 8 features are required"
            )

        # Convert input data to the format expected by the model
        input_data = np.array(data.features).reshape(1, -1)

        # Debug logging
        print("Received features:", data.features)
        print("Shaped input data:", input_data)

        # Preprocess the entered data
        data_scaled = scaler.transform(input_data)
        print("Scaled data:", data_scaled)

        # Make a prediction
        prediction = model.predict(data_scaled)
        print("Model prediction:", prediction)

        # Map the model output to a human-readable format
        is_potable = bool(prediction[0])

        return {"potability": is_potable}

    except Exception as e:
        print("Error during prediction:", str(e))  # Debug logging
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Add a test endpoint to verify API is running
@app.get("/")
async def root():
    return {"message": "Water Quality Prediction API is running"}

