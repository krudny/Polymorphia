package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameResponseDto;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hall-of-fame")
@AllArgsConstructor
public class HallOfFameController {
    private final HallOfFameService hallOfFameService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public HallOfFameResponseDto getHallOfFame(@Valid @RequestBody HallOfFameRequestDto hallOfFameRequestDto) {
        return hallOfFameService.getHallOfFame(hallOfFameRequestDto);
    }

    @GetMapping("/podium")
    @PreAuthorize("isAuthenticated()")
    public List<HallOfFameRecordDto> getPodium(@RequestParam Long courseId) {
        return hallOfFameService.getPodium(courseId);
    }
}
