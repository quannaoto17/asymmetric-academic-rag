package com.rag.academic.ingest;

import java.time.Instant;
import java.util.UUID;

public record DocumentChunk(
        UUID id,
        UUID documentId,
        int chunkIndex,
        String sectionPath,
        Integer pageNumber,
        String content,
        float[] embedding,
        Instant createdAt
) {
}
