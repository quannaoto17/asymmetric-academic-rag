package com.rag.academic.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public final class CourseDto {

    private CourseDto() {
    }

    public record CreateCourseRequest(
            @NotBlank(message = "Course code must not be blank")
            @Size(max = 50, message = "Course code must be at most 50 characters")
            String code,

            @NotBlank(message = "Course name must not be blank")
            @Size(max = 255, message = "Course name must be at most 255 characters")
            String name,

            String description
    ) {
    }

    public record CourseResponse(
            UUID id,
            String code,
            String name,
            String description,
            Instant createdAt
    ) {
        public static CourseResponse from(Course course) {
            return new CourseResponse(
                    course.getId(),
                    course.getCode(),
                    course.getName(),
                    course.getDescription(),
                    course.getCreatedAt()
            );
        }
    }
}
