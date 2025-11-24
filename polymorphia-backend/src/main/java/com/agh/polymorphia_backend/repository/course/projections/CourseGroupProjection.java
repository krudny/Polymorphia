package com.agh.polymorphia_backend.repository.course.projections;

public interface CourseGroupProjection extends CourseGroupShortProjection {
    String getRoom();
    Integer getStudentCount();
}
