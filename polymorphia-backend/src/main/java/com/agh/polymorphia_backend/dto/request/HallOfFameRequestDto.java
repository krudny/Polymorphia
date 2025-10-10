package com.agh.polymorphia_backend.dto.request;

import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record HallOfFameRequestDto(
        @NotNull Long courseId,
        @NotNull Integer page,
        @NotNull Integer size,
        @NotNull String searchTerm,
        @NotNull SearchBy searchBy,
        @NotBlank String sortBy,
        @NotNull SortOrder sortOrder,
        @NotNull List<String> groups
){ }
