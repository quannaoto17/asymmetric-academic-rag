package com.rag.academic.retrieval;

import com.rag.academic.document.DocumentRole;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HybridSearchService {

    public List<HybridSearchResult> search(UUID courseId, String query, DocumentRole roleFilter, int topK) {
        return List.of();
    }
}
