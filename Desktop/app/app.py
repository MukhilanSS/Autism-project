from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes with more flexible settings
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://localhost:5174","http://localhost:5175"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load your model
with open("model/model.pkl", "rb") as file:
    model_dict = pickle.load(file)

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        # Handle preflight request
        return jsonify({"status": "success"}), 200
        
    try:
        # Get JSON data instead of form data
        data = request.get_json()
        
        # Prepare input for prediction
        input_data = np.array([
            int(data["q1"]), int(data["q2"]), int(data["q3"]),
            int(data["q4"]), int(data["q5"]), int(data["q6"]),
            int(data["q7"]), int(data["q8"]), int(data["q9"]),
            int(data["q10"]), int(data["age"]), int(data["gender"]),
            int(data["jaundice"]), int(data["family_asd"]),
            0, 0, 0, 0
        ]).reshape(1, -1)

        # Choose model
        model = model_dict.get(data["user_type"])
        if not model:
            return jsonify({"error": "Invalid user type"}), 400

        prediction = model.predict(input_data)[0]
        result = "Autism Detected" if prediction == 1 else "No Autism Detected"
        
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)