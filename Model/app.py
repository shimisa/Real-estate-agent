import logging
from flask import Flask, request, jsonify
from model_loader import predict_price


logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)



@app.route('/predict', methods=['POST'])
def predict():
    """Predict price using API endpoint."""
    try:
        predicted_price = predict_price(request.data)
        return {"predicted_price": predicted_price}
    except Exception as e:
        logger.error(f"Error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
