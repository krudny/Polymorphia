package com.agh.polymorphia_backend.dto.response.user;

public sealed interface StudentDetailsResponseDto permits StudentDetailsWithoutNameResponseDto, StudentDetailsWithNameResponseDto{ }
