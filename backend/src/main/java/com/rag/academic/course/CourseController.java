package com.rag.academic.course;

import com.rag.academic.common.ResourceNotFoundException;
import com.rag.academic.course.CourseDto.CourseResponse;
import com.rag.academic.course.CourseDto.CreateCourseRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
@Tag(name = "Courses", description = "Course and syllabus management")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    @Operation(summary = "List all courses")
    public List<CourseResponse> listCourses() {
        return courseRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(CourseResponse::from)
                .toList();
    }

    @PostMapping
    @Operation(summary = "Create a new course")
    public ResponseEntity<CourseResponse> createCourse(@Valid @RequestBody CreateCourseRequest request) {
        String normalizedCode = request.code().trim().toUpperCase();
        if (courseRepository.existsByCodeIgnoreCase(normalizedCode)) {
            throw new IllegalArgumentException("Course with code '" + normalizedCode + "' already exists.");
        }
        Course saved = courseRepository.save(new Course(
                normalizedCode,
                request.name().trim(),
                request.description() != null ? request.description().trim() : null
        ));
        return ResponseEntity.status(HttpStatus.CREATED).body(CourseResponse.from(saved));
    }

    @GetMapping("/{courseId}")
    @Operation(summary = "Get course details by ID")
    public CourseResponse getCourse(@PathVariable UUID courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        return CourseResponse.from(course);
    }
}
