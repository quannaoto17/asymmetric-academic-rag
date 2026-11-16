package com.rag.academic.discrepancy;

import java.util.UUID;

public record DiscrepancyReport(
        UUID primaryChunkId,
        UUID secondaryChunkId,
        Severity severity,
        DiscrepancyType type,
        String summaryVi,
        String slideClaim,
        String textbookEvidence
) {
    public enum Severity {
        LOW,
        MEDIUM,
        HIGH
    }

    public enum DiscrepancyType {
        OMITTED_BOUNDARY_CONDITION,
        TERMINOLOGY_MISMATCH,
        OUTDATED_DETAIL,
        FACTUAL_CONFLICT
    }
}
