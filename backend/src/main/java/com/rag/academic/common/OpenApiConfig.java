package com.rag.academic.common;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI academicRagOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Asymmetric Academic RAG Platform API")
                        .description("API đối chiếu tài liệu PRIMARY (Slide/Đề cương) và SECONDARY (Giáo trình tiếng Anh), phát hiện sai lệch kiến thức và hỏi đáp song ngữ Anh–Việt.")
                        .version("v1.0.0"));
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
