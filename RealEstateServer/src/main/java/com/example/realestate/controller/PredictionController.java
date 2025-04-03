package com.example.realestate.controller;

import com.example.realestate.dto.PredictionRequest;
import com.example.realestate.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/predict")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping
    public String predict(@RequestBody PredictionRequest request) {
        predictionService.sendPredictionRequest(request);
        return "Prediction request sent. Waiting for response...";
    }
}
