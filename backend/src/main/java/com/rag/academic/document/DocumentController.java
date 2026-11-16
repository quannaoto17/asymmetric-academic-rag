package com.rag.academic.document;

import com.rag.academic.common.ResourceNotFoundException;
import com.rag.academic.course.CourseRepository;
import com.rag.academic.document.DocumentDto.DocumentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses/{courseId}/documents")
@Tag(name = "Documents", description = "PRIMARY and SECONDARY academic document management")
public class DocumentController {

    private final CourseRepository courseRepository;
    private final DocumentRepository documentRepository;

    public DocumentController(CourseRepository courseRepository, DocumentRepository documentRepository) {
        this.courseRepository = courseRepository;
        this.documentRepository = documentRepository;
    }

    @GetMapping
    @Operation(summary = "List documents belonging to a course")
    public List<DocumentResponse> listDocuments(@PathVariable UUID courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course not found: " + courseId);
        }
        return documentRepository.findByCourseIdOrderByCreatedAtDesc(courseId)
                .stream()
                .map(DocumentResponse::from)
                .toList();
    }
}
