package com.rag.academic.eval;

import com.rag.academic.common.GeminiConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.context.annotation.Import;

/** Lightweight entry point for Gemini integration tests and model comparisons; it does not start PostgreSQL. */
@SpringBootApplication(
        scanBasePackages = "com.rag.academic.eval",
        exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class, FlywayAutoConfiguration.class})
@Import(GeminiConfig.class)
public class GeminiBenchmarkApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeminiBenchmarkApplication.class, args);
    }
}
