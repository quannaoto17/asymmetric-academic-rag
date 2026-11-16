package com.rag.academic.retrieval;

import com.rag.academic.document.DocumentRole;

import java.util.UUID;

public record HybridSearchResult(
        UUID chunkId,
        UUID documentId,
        DocumentRole role,
        String sectionPath,
        Integer pageNumber,
        String content,
        double rrfScore
) {
}
