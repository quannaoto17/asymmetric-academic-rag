package com.rag.academic.common;

import dev.langchain4j.model.chat.ChatModel;
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

    @Bean
    @Primary
    public EmbeddingModel documentEmbeddingModel(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.embedding.model-name}") String modelName,
            @Value("${gemini.embedding.dimensions}") int dimensions,
            @Value("${gemini.embedding.timeout}") Duration timeout,
            @Value("${gemini.embedding.max-retries}") int maxRetries,
            @Value("${gemini.embedding.log-requests}") boolean logRequests,
            @Value("${gemini.embedding.log-responses}") boolean logResponses) {
        return GoogleAiEmbeddingModel.builder()
                .apiKey(apiKey)
                .modelName(modelName)
                .outputDimensionality(dimensions)
                .taskType(TaskType.RETRIEVAL_DOCUMENT)
                .timeout(timeout)
                .maxRetries(maxRetries)
                .logRequests(logRequests)
                .logResponses(logResponses)
                .build();
    }

    @Bean("queryEmbeddingModel")
    public EmbeddingModel queryEmbeddingModel(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.embedding.model-name}") String modelName,
            @Value("${gemini.embedding.dimensions}") int dimensions,
            @Value("${gemini.embedding.timeout}") Duration timeout,
            @Value("${gemini.embedding.max-retries}") int maxRetries,
            @Value("${gemini.embedding.log-requests}") boolean logRequests,
            @Value("${gemini.embedding.log-responses}") boolean logResponses) {
        return GoogleAiEmbeddingModel.builder()
                .apiKey(apiKey)
                .modelName(modelName)
                .outputDimensionality(dimensions)
                .taskType(TaskType.RETRIEVAL_QUERY)
                .timeout(timeout)
                .maxRetries(maxRetries)
                .logRequests(logRequests)
                .logResponses(logResponses)
                .build();
    }

    @Bean
    public ChatModel chatLanguageModel(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.chat.model-name}") String modelName,
            @Value("${gemini.chat.temperature}") double temperature,
            @Value("${gemini.chat.timeout}") Duration timeout,
            @Value("${gemini.chat.max-retries}") int maxRetries,
            @Value("${gemini.chat.log-requests}") boolean logRequests,
            @Value("${gemini.chat.log-responses}") boolean logResponses) {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName(modelName)
                .temperature(temperature)
                .timeout(timeout)
                .maxRetries(maxRetries)
                .logRequests(logRequests)
                .logResponses(logResponses)
                .build();
    }
}
