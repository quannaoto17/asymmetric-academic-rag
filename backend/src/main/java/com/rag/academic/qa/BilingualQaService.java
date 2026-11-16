package com.rag.academic.qa;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BilingualQaService {

    public BilingualAnswer answerWithinScope(UUID courseId, String question) {
        return new BilingualAnswer(
                question,
                "Chức năng hỏi đáp song ngữ đang ở giai đoạn khung (scaffolding).",
                List.of(),
                List.of(),
                List.of(),
                true
        );
    }

    public List<QuizQuestion> generateScopedQuiz(UUID courseId, int count) {
        return List.of();
    }
}
