package com.rag.academic.align;

import java.util.List;
import java.util.UUID;

public record SlideAlignmentResult(
        UUID primaryChunkId,
        String slideSectionPath,
        Integer slidePage,
        List<MatchedBookSection> matchedTextbookSections
) {
    public record MatchedBookSection(
            UUID secondaryChunkId,
            String bookSectionPath,
            Integer bookPage,
            double confidenceScore,
            String rationale
    ) {
    }
}
