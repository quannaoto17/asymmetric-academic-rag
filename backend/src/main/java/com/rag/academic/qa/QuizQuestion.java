package com.rag.academic.qa;

import java.util.List;

public record QuizQuestion(
        String questionVi,
        List<String> options,
        int correctOptionIndex,
        String explanationVi,
        String primarySourceReference
) {
}
