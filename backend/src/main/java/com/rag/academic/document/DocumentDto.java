package com.rag.academic.document;

import java.time.Instant;
import java.util.UUID;

public final class DocumentDto {

    private DocumentDto() {
    }

    public record DocumentResponse(
            UUID id,
            UUID courseId,
            String title,
            String fileName,
            DocumentRole role,
            DocumentStatus status,
            Instant createdAt
    ) {
        public static DocumentResponse from(Document document) {
            return new DocumentResponse(
                    document.getId(),
                    document.getCourse().getId(),
                    document.getTitle(),
                    document.getFileName(),
                    document.getRole(),
                    document.getStatus(),
                    document.getCreatedAt()
            );
        }
    }
}
