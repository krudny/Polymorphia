package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hall-of-fame")
@AllArgsConstructor
public class HallOfFameController {
    private final HallOfFameService hallOfFameService;

    @GetMapping
    public Page<HallOfFameRecordDto> getHallOfFame(@Valid @RequestBody HallOfFameRequestDto hallOfFameRequestDto) {
        return hallOfFameService.getHallOfFame(hallOfFameRequestDto);
    }
}
