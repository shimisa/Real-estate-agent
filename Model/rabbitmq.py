import pika
import json
from model_loader import predict_price

# RabbitMQ connection details
RABBITMQ_HOST = 'localhost'
REQUEST_QUEUE = 'real_estate_predictions'
RESPONSE_QUEUE = 'real_estate_predictions_response'

# Establish connection
connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
channel = connection.channel()

# Declare queues
channel.queue_declare(queue=REQUEST_QUEUE)
channel.queue_declare(queue=RESPONSE_QUEUE)

def on_message(ch, method, properties, body):
    """Callback function when a message is received."""
    try:
        data = json.loads(body)
        print(f"📩 Received Request: {data}")

        # Make prediction
        predicted_price = predict_price(data)

        # Send response back to response queue
        response = {'predicted_price': predicted_price}
        channel.basic_publish(exchange='', routing_key=RESPONSE_QUEUE, body=json.dumps(response))
        print(f"✅ Sent Response: {response}")

    except Exception as e:
        print(f"❌ Error: {e}")

# Start listening to RabbitMQ
channel.basic_consume(queue=REQUEST_QUEUE, on_message_callback=on_message, auto_ack=True)
print("🔄 Waiting for messages...")
channel.start_consuming()
