package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.HallOfFameService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/hall-of-fame")
@AllArgsConstructor
public class HallOfFameController {
    private final HallOfFameService hallOfFameService;

    @GetMapping
    public Page<HallOfFameRecordDto> get(
            @RequestParam Long courseId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "") String searchTerm,
            @RequestParam(defaultValue = "total") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder,
            @RequestParam(required = false) List<String> groups
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        boolean includeStudentName = authorities.contains(UserType.COORDINATOR) || authorities.contains(UserType.INSTRUCTOR);
        return hallOfFameService.getHallOfFame(courseId, page, size, searchTerm, sortBy, sortOrder, groups, includeStudentName);
    }
}
