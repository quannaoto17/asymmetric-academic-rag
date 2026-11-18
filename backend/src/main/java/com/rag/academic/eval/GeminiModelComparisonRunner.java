package com.rag.academic.eval;

import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.request.ChatRequestParameters;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.model.output.TokenUsage;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.Duration;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
@ConditionalOnProperty(name = "gemini.comparison.enabled", havingValue = "true")
public class GeminiModelComparisonRunner implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(GeminiModelComparisonRunner.class);

    private final String apiKey;
    private final List<String> modelNames;
    private final double temperature;
    private final Duration timeout;
    private final int maxRetries;
    private final boolean logRequests;
    private final boolean logResponses;
    private final Path output;

    public GeminiModelComparisonRunner(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.chat.comparison-models}") List<String> modelNames,
            @Value("${gemini.chat.temperature}") double temperature,
            @Value("${gemini.chat.timeout}") Duration timeout,
            @Value("${gemini.chat.max-retries}") int maxRetries,
            @Value("${gemini.chat.log-requests}") boolean logRequests,
            @Value("${gemini.chat.log-responses}") boolean logResponses,
            @Value("${gemini.comparison.output}") String output) {
        this.apiKey = apiKey;
        this.modelNames = modelNames.stream().map(String::trim).filter(s -> !s.isBlank()).toList();
        this.temperature = temperature;
        this.timeout = timeout;
        this.maxRetries = maxRetries;
        this.logRequests = logRequests;
        this.logResponses = logResponses;
        this.output = Path.of(output);
    }

    @Override
    public void run(ApplicationArguments args) throws IOException {
        if (modelNames.size() < 2) {
            throw new IllegalStateException("GEMINI_COMPARISON_MODELS must contain at least two comma-separated model names");
        }
        if (apiKey == null || apiKey.isBlank() || "dummy-key".equals(apiKey)) {
            throw new IllegalStateException("Set GEMINI_API_KEY before enabling the Gemini comparison runner");
        }

        Map<String, List<Result>> results = new LinkedHashMap<>();
        for (String modelName : modelNames) {
            ChatModel model = model(modelName);
            List<Result> modelResults = new ArrayList<>();
            for (VietnameseBenchmarkCase testCase : VietnameseBenchmarkDataset.cases()) {
                Instant start = Instant.now();
                try {
                    ChatResponse response = model.chat(ChatRequest.builder()
                            .messages(dev.langchain4j.data.message.UserMessage.from(testCase.prompt()))
                            .parameters(ChatRequestParameters.builder().temperature(temperature).build())
                            .build());
                    long latencyMs = Duration.between(start, Instant.now()).toMillis();
                    TokenUsage usage = response.tokenUsage();
                    String text = response.aiMessage() == null ? "" : response.aiMessage().text();
                    boolean success = !text.isBlank();
                    boolean structuredValid = success && (!testCase.category().equals("json") || isValidJson(text));
                    modelResults.add(new Result(testCase, latencyMs, usage, success, structuredValid, "", text));
                } catch (Exception e) {
                    long latencyMs = Duration.between(start, Instant.now()).toMillis();
                    log.warn("Model {} failed case {}: {}", modelName, testCase.id(), e.toString());
                    modelResults.add(new Result(testCase, latencyMs, null, false, false, oneLine(e.getMessage()), ""));
                }
            }
            results.put(modelName, modelResults);
        }

        Path parent = output.toAbsolutePath().getParent();
        if (parent != null) Files.createDirectories(parent);
        Files.writeString(output, toMarkdown(results), StandardCharsets.UTF_8);
        log.info("Gemini comparison written to {}", output.toAbsolutePath());
    }

    private ChatModel model(String modelName) {
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

    private String toMarkdown(Map<String, List<Result>> results) {
        StringBuilder md = new StringBuilder("# Gemini model comparison\n\n")
                .append("Generated: ").append(Instant.now()).append("\n\n")
                .append("Dataset: 20 Vietnamese prompts (QA, summaries, extraction, sentiment, JSON, varied length and diacritics). ")
                .append("Success means non-empty response. JSON validity is parsed for JSON prompts; record extraction is checked separately by the AiService integration test. ")
                .append("Quota/rate-limit errors are counted from provider error messages.\n\n")
                .append("## Summary\n\n")
                .append("| Model | Success | Success rate | Avg latency (ms) | Avg total tokens | JSON valid | Quota/rate errors | Manual quality (1-5) |\n")
                .append("|---|---:|---:|---:|---:|---:|---:|---:|\n");

        for (Map.Entry<String, List<Result>> entry : results.entrySet()) {
            List<Result> rows = entry.getValue();
            long successes = rows.stream().filter(Result::success).count();
            double avgLatency = rows.stream().mapToLong(Result::latencyMs).average().orElse(0);
            double avgTokens = rows.stream().map(Result::usage).filter(u -> u != null && u.totalTokenCount() != null)
                    .mapToInt(TokenUsage::totalTokenCount).average().orElse(0);
            long jsonCount = rows.stream().filter(r -> r.testCase().category().equals("json")).count();
            long jsonValid = rows.stream().filter(r -> r.testCase().category().equals("json") && r.structuredValid()).count();
            long quotaErrors = rows.stream().filter(r -> isQuotaError(r.error())).count();
            md.append("| ").append(entry.getKey()).append(" | ").append(successes).append("/20 | ")
                    .append(String.format("%.0f%%", successes * 5.0)).append(" | ")
                    .append(String.format("%.0f", avgLatency)).append(" | ")
                    .append(String.format("%.1f", avgTokens)).append(" | ")
                    .append(jsonValid).append("/").append(jsonCount).append(" | ")
                    .append(quotaErrors).append(" | _pending_ |\n");
        }
        md.append("\n## Manual selection\n\n")
                .append("Selected model: _pending manual review_. Choose after reviewing quality scores, latency, token usage, and success rate.\n\n")
                .append("## Prompt set\n\n")
                .append("Use these prompts to judge the corresponding model responses below.\n\n")
                .append("| ID | Category | Prompt |\n|---|---|---|\n");

        for (VietnameseBenchmarkCase testCase : VietnameseBenchmarkDataset.cases()) {
            md.append("| ").append(testCase.id()).append(" | ").append(testCase.category())
                    .append(" | ").append(escape(testCase.prompt())).append(" |\n");
        }

        md.append("\n## Per-prompt results\n\n");

        for (Map.Entry<String, List<Result>> entry : results.entrySet()) {
            md.append("### ").append(entry.getKey()).append("\n\n")
                    .append("| ID | Category | Latency (ms) | Input tokens | Output tokens | Success | Output check | Error / response preview |\n")
                    .append("|---|---|---:|---:|---:|---|---|---|\n");
            for (Result result : entry.getValue()) {
                TokenUsage usage = result.usage();
                String detail = result.success() ? result.response() : result.error();
                md.append("| ").append(result.testCase().id()).append(" | ").append(result.testCase().category())
                        .append(" | ").append(result.latencyMs()).append(" | ")
                        .append(usage == null ? "" : nullSafe(usage.inputTokenCount())).append(" | ")
                        .append(usage == null ? "" : nullSafe(usage.outputTokenCount())).append(" | ")
                        .append(result.success() ? "yes" : "no").append(" | ")
                        .append(outputCheck(result)).append(" | ")
                        .append(escape(detail.length() > 1200 ? detail.substring(0, 1200) + "…" : detail)).append(" |\n");
            }
            md.append('\n');
        }
        md.append("## Manual quality review\n\n")
                .append("Score each model from 1 (incorrect or unusable) to 5 (accurate, follows the request, and natural Vietnamese). ")
                .append("Leave scores blank until reviewed. For structured output, verify fields and JSON/record shape.\n\n")
                .append("## Quota and limitations\n\n")
                .append("Quota errors are identified from failed responses containing 429, RESOURCE_EXHAUSTED, quota, or rate-limit markers. ")
                .append("This run does not reveal the full project quota or remaining daily allowance; consult the Google AI Studio or Google Cloud quota page for that.\n");
        return md.toString();
    }

    private static boolean isValidJson(String text) {
        String candidate = text.trim();
        if (candidate.startsWith("```")) {
            candidate = candidate.replaceFirst("^```(?:json)?\\s*", "").replaceFirst("\\s*```$", "");
        }
        try {
            new com.fasterxml.jackson.databind.ObjectMapper().readTree(candidate);
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }

    private static boolean isQuotaError(String text) {
        if (text == null) return false;
        String normalized = text.toLowerCase();
        return normalized.contains("429") || normalized.contains("resource_exhausted")
                || normalized.contains("quota") || normalized.contains("rate limit") || normalized.contains("rate-limit");
    }

    private static String outputCheck(Result result) {
        if (!result.success()) return "no response";
        if (result.testCase().category().equals("json")) {
            return result.structuredValid() ? "valid JSON" : "invalid JSON";
        }
        return "response received";
    }

    private static String nullSafe(Integer value) {
        return value == null ? "" : value.toString();
    }

    private static String oneLine(String text) {
        return text == null ? "unknown error" : text.replace('\n', ' ').replace('\r', ' ');
    }

    private static String escape(String text) {
        return oneLine(text).replace("|", "\\|");
    }

    private record Result(VietnameseBenchmarkCase testCase, long latencyMs, TokenUsage usage,
                          boolean success, boolean structuredValid, String error, String response) {
    }
}
