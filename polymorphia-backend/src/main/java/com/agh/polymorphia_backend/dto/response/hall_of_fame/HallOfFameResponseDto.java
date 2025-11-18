package com.agh.polymorphia_backend.dto.response.hall_of_fame;

import org.springframework.data.domain.Page;

import java.util.List;

public record HallOfFameResponseDto(
        List<HallOfFameRecordDto> content,
        int currentUserPage,
        PageMetadata page
) {
    public HallOfFameResponseDto(Page<HallOfFameRecordDto> page, int currentUserPage) {
        this(page.getContent(), currentUserPage, new PageMetadata(page.getNumber(), page.getTotalPages()));
    }

    record PageMetadata(int number, int totalPages) {
    }
}
