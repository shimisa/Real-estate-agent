import logging
import joblib
import numpy as np
import tensorflow as tf
import pandas as pd
import joblib
from flask import Flask, request, jsonify

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


# ✅ Load trained AI model
model = tf.keras.models.load_model("real_estate_price_model.h5", custom_objects={'mse': tf.keras.losses.MeanSquaredError()})

# ✅ Load the saved StandardScaler
scaler = joblib.load("scaler.pkl")
scaler_y = joblib.load("scaler_y.pkl")

# ✅ Load transaction_date min/max
transaction_date_minmax = joblib.load("transaction_date_minmax.pkl")
transaction_date_min = int(transaction_date_minmax['min'])
transaction_date_max = int(transaction_date_minmax['max'])

logger.info(f"Loaded transaction_date_min: {transaction_date_min} (type: {type(transaction_date_min)})")
logger.info(f"Loaded transaction_date_max: {transaction_date_max} (type: {type(transaction_date_max)})")
logging.info(f"transaction_date_min: {transaction_date_min}, transaction_date_max: {transaction_date_max}")

def preprocess_input(data):
    """Preprocess incoming data before feeding it into the model."""
    # Get the request data
    logger.info(f"Received request data: {data}")
    transaction_date = data['transaction_date']
    location_encoded = data['location_encoded']
    year_built = data['year_built']
    size = data['size']
    bedrooms = data['bedrooms']

    # ✅ Convert string date to ordinal integer
    transaction_date = pd.to_datetime(transaction_date).toordinal()
    transaction_date = max(transaction_date_min, min(transaction_date, transaction_date_max))
    transaction_date_normalized = (transaction_date - transaction_date_min) / (
                transaction_date_max - transaction_date_min)

    logger.info(
        f"Normalized transaction_date: {transaction_date_normalized} (type: {type(transaction_date_normalized)})")

    # ✅ Convert input data to NumPy array
    input_data = np.array([[transaction_date_normalized,
                            int(location_encoded),
                            int(year_built),
                            float(size),
                            float(bedrooms)]], dtype=np.float64)

    logger.info(f"Raw Input Data (before scaling): {input_data}")

    # ✅ Scale input
    input_scaled = scaler.transform(np.asarray(input_data).reshape(1, -1))
    logger.info(f"Scaled Input Data: {input_scaled}")
    return input_scaled

def predict_price(data):
    """Make prediction and return the original price."""
    input_scaled = preprocess_input(data)
    # ✅ Predict price
    predicted_price = model.predict(input_scaled)[0][0]
    logger.info(f"Predicted Price: {predicted_price}")

    # Now, use the target scaler to inverse transform the predicted value
    original_price = scaler_y.inverse_transform([[predicted_price]])

    # Extract the scalar value from the inverse transformation
    original_price = original_price[0][0]

    logger.info(f"Original Price: {original_price}")

    # Return the prediction with the "predicted_price" label
    return jsonify({'predicted_price': round(float(original_price), 2)})