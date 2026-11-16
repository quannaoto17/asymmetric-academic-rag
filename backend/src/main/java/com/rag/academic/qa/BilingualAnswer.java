package com.rag.academic.qa;

import java.util.List;

public record BilingualAnswer(
        String question,
        String answerVi,
        List<String> lockedEnglishTerms,
        List<String> primaryCitations,
        List<String> secondaryCitations,
        boolean withinLectureScope
) {
}
