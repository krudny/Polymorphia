package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.AuthService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hall-of-fame")
@AllArgsConstructor
public class HallOfFameController {
    private final AuthService authService;
    private final HallOfFameService hallOfFameService;

    @GetMapping
    public Page<HallOfFameRecordDto> getHallOfFame(@ModelAttribute HallOfFameRequestDto hallOfFameRequestDto) { // TODO: query or json?
        boolean includeStudentName = authService.hasAnyRole(List.of(UserType.COORDINATOR, UserType.INSTRUCTOR));
        return hallOfFameService.getHallOfFame(hallOfFameRequestDto, includeStudentName);
    }
}
