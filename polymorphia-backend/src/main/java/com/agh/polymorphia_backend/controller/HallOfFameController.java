package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.AuthService;
import com.agh.polymorphia_backend.service.HallOfFameService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hall-of-fame")
@AllArgsConstructor
public class HallOfFameController {
    private final AuthService authService;
    private final HallOfFameService hallOfFameService;

    @GetMapping
    public Page<HallOfFameRecordDto> getHallOfFame(
            @RequestParam Long courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "") String searchTerm,
            @RequestParam(defaultValue = "total") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder,
            @RequestParam(required = false) List<String> groups
    ) {
        boolean includeStudentName = authService.hasAnyRole(List.of(UserType.COORDINATOR, UserType.INSTRUCTOR));
        return hallOfFameService.getHallOfFame(courseId, page, size, searchTerm, sortBy, sortOrder, groups, includeStudentName);
    }
}
