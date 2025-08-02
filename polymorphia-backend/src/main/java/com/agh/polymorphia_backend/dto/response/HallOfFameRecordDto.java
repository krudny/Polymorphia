package com.agh.polymorphia_backend.dto.response;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;

public record HallOfFameRecordDto (
        StudentDetailsResponseDto userDetails

){}
