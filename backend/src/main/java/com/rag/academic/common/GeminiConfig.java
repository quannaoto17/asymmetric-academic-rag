package com.rag.academic.common;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.googleai.GoogleAiEmbeddingModel;
import dev.langchain4j.model.googleai.GoogleAiEmbeddingModel.TaskType;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.time.Duration;

@Configuration
public class GeminiConfig {

    private static final String EMBEDDING_MODEL_NAME = "gemini-embedding-001";
    private static final String CHAT_MODEL_NAME = "gemini-2.5-flash";
    private static final int EMBEDDING_DIMENSIONS = 768;

    @Bean
    @Primary
    public EmbeddingModel documentEmbeddingModel(@Value("${gemini.api-key}") String apiKey) {
        return GoogleAiEmbeddingModel.builder()
                .apiKey(apiKey)
                .modelName(EMBEDDING_MODEL_NAME)
                .outputDimensionality(EMBEDDING_DIMENSIONS)
                .taskType(TaskType.RETRIEVAL_DOCUMENT)
                .timeout(Duration.ofSeconds(30))
                .build();
    }

    @Bean("queryEmbeddingModel")
    public EmbeddingModel queryEmbeddingModel(@Value("${gemini.api-key}") String apiKey) {
        return GoogleAiEmbeddingModel.builder()
                .apiKey(apiKey)
                .modelName(EMBEDDING_MODEL_NAME)
                .outputDimensionality(EMBEDDING_DIMENSIONS)
                .taskType(TaskType.RETRIEVAL_QUERY)
                .timeout(Duration.ofSeconds(30))
                .build();
    }

    @Bean
    public ChatLanguageModel chatLanguageModel(@Value("${gemini.api-key}") String apiKey) {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName(CHAT_MODEL_NAME)
                .temperature(0.2)
                .timeout(Duration.ofSeconds(60))
                .build();
    }
}
