package com.agh.polymorphia_backend.dto.request;

import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@NoArgsConstructor
@Getter
public class HallOfFameRequestDto {
    @Setter
    private long courseId;
    private int page = 0;
    private int size = 50;
    private String searchTerm = "";
    private String sortBy = "total";
    private SortOrder sortOrder = SortOrder.DESC;
    @Setter
    private List<String> groups;

    @JsonSetter(nulls = Nulls.SKIP)
    public void setPage(int page) {
        this.page = page;
    }

    @JsonSetter(nulls = Nulls.SKIP)
    public void setSize(int size) {
        this.size = size;
    }

    @JsonSetter(nulls = Nulls.SKIP)
    public void setSearchTerm(String searchTerm) {
        if (searchTerm.isBlank()){
            this.searchTerm = "";
        } else {
            this.searchTerm = searchTerm;
        }
    }

    @JsonSetter(nulls = Nulls.SKIP)
    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    @JsonSetter(nulls = Nulls.SKIP)
    public void setSortOrder(String sortOrder) {
        this.sortOrder = SortOrder.fromString(sortOrder);
    }

    public Pageable getPageable() {
        return PageRequest.of(page, size, Sort.by(sortOrder.getDirection(), sortBy));
    }

    public String[] getGroupsAsArray(){
        if (groups == null || groups.isEmpty()){
            return new String[0];
        }
        return groups.toArray(String[]::new);
    }
}
