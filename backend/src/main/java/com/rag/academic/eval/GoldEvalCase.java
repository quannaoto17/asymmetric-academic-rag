package com.rag.academic.eval;

import java.util.List;

public record GoldEvalCase(
        String id,
        String question,
        List<String> expectedPrimarySections,
        List<String> expectedSecondarySections,
        boolean expectsDiscrepancy
) {
}
