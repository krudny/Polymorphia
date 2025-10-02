package com.agh.polymorphia_backend.dto.response.hall_of_fame;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import lombok.Builder;

import java.util.Map;

@Builder
public record HallOfFameResponseDto(
        StudentDetailsResponseDto userDetails,
        Map<String, String> xpDetails
) {
}
