package com.rag.academic.ingest;

import com.rag.academic.document.DocumentRole;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class IngestService {

    public List<DocumentChunk> parseAndChunkPlaceholder(UUID documentId, DocumentRole role, String fileName) {
        return List.of();
    }
}
