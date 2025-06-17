package com.agh.polymorphia_backend.controller;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class RankResponse {
    private Map<String, String> userDetails;
    private Map<String, Double> xpDetails;
}