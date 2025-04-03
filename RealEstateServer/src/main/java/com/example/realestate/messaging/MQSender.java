package com.example.realestate.messaging;

import com.example.realestate.config.RabbitMQConfig;
import com.example.realestate.dto.PredictionRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MQSender {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(PredictionRequest request) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_NAME, request);
    }
}
