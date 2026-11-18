package com.rag.academic.eval;

import java.util.List;

public record ExtractedInfo(
        String summary,
        String sentiment,
        List<String> keyPoints,
        List<String> entities) {
}
