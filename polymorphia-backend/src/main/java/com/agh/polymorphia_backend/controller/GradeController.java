package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.service.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/grades")
public class GradeController {
    private final GradeService gradeService;

    @PostMapping()
    public ResponseEntity<Void> gradeStudent(@RequestBody GradeRequestDto gradeRequestDto) {
        Long gradeId = gradeService.gradeStudent(gradeRequestDto);
        return Util.getCreatedResponseEntity(gradeId);
    }
}
