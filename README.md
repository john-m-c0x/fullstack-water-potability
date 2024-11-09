# Water Potability - Assignment Three

This repository contains the code for **Assignment Three** of the COS30049. 
The objective of this project is to analyze and predict the potability of water based on various chemical properties using machine learning models.

## Project Overview

The Water Potability project focuses on identifying whether a water sample is potable (drinkable) or not, based on factors such as pH, hardness, solids, and others. It aims to apply machine learning techniques for classification and prediction.

## Installation

### Prerequisites
- Ensure you have **Node.js** installed on your system. You can download it from [Node.js](https://nodejs.org/).
- Ensure you have **Python** installed on your system. You can download it from [Python](https://www.python.org/).

### Steps to Install Dependencies

1. Clone this repository:

    ```bash
    git clone https://github.com/john-m-c0x/fullstack-water-potability.git
    ```

2. Set up the frontend and run the react app:

    ```bash
    cd fullstack-water-potability/frontend
    npm install
    npm start
    ```

3. Set up the backend, install dependencies, start the virtual environment and run the server:

    ```bash
    cd ../backend
    pip install -r app/requirements.txt

    # Start the virtual environment
    python -m venv venv
    
    # On Windows
    .\venv\Scripts\activate
    
    # On Unix or MacOS
    source venv/bin/activate
    
    # Run the server
    uvicorn app.main:app --reload --port 5000
    ```

## Usage

To run the project, you'll need to start both the frontend and backend servers, and interact with the App through the frontend.

