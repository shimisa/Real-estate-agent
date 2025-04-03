package com.example.realestate.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictionRequest {
    private String transactionDate;
    private int locationEncoded;
    private int yearBuilt;
    private double size;
    private int bedrooms;
}
