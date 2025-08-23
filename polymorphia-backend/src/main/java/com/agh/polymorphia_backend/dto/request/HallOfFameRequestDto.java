package com.agh.polymorphia_backend.dto.request;

import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public record HallOfFameRequestDto (
        @NotNull Long courseId,
        @NotNull Integer page,
        @NotNull Integer size,
        @NotNull String searchTerm,
        @NotNull SearchBy searchBy,
        @NotBlank String sortBy,
        @NotNull SortOrder sortOrder,
        @NotNull List<String> groups
){
    public Pageable getPageable() {
        return PageRequest.of(page, size, Sort.by(sortOrder.getDirection(), sortBy));
    }

    public String[] getGroupsAsArray() {
        if (groups == null || groups.isEmpty()){
            return new String[0];
        }
        return groups.toArray(String[]::new);
    }
}
