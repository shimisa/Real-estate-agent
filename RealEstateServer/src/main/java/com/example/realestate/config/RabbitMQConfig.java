package com.example.realestate.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String QUEUE_NAME = "real_estate_predictions";

    @Bean
    public Queue predictionQueue() {
        return new Queue(QUEUE_NAME, false);
    }
}
