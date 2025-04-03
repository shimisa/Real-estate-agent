package com.example.realestate.messaging;

import com.example.realestate.dto.PredictionResponse;
import com.example.realestate.websocket.PredictionWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MQReceiver {
    @RabbitListener(queues = "real_estate_predictions_response")
    public void receiveResponse(String message) {
        try {
            PredictionResponse response = new ObjectMapper().readValue(message, PredictionResponse.class);
            String predictionMessage = "Predicted Price: $" + response.getPredictedPrice();

            System.out.println("✅ Received Predicted Price: " + response.getPredictedPrice());

            // Send real-time notification via WebSocket
            PredictionWebSocketHandler.sendPredictionUpdate(predictionMessage);
        } catch (Exception e) {
            System.err.println("❌ Error processing response: " + e.getMessage());
        }
    }
}
