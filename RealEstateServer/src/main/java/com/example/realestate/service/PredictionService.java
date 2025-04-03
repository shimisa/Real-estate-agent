package com.example.realestate.service;

import com.example.realestate.dto.PredictionRequest;
import com.example.realestate.dto.PredictionResponse;
import com.example.realestate.messaging.MQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    @Autowired
    private MQSender mqSender;

    public void sendPredictionRequest(PredictionRequest request) {
        mqSender.sendMessage(request);
    }
}
