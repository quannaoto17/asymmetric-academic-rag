package com.rag.academic;

import com.rag.academic.eval.ExtractedInfo;
import com.rag.academic.eval.GeminiBenchmarkApplication;
import com.rag.academic.eval.VietnameseExtractionAiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = GeminiBenchmarkApplication.class)
@ActiveProfiles("gemini-test")
class VietnameseExtractionAiServiceIT {

    @Autowired
    private VietnameseExtractionAiService extractionAiService;

    @Test
    void extractsVietnameseTextIntoRecord() {
        ExtractedInfo result = extractionAiService.extract(
                "Nguyễn Minh Anh, trưởng nhóm, tổ chức buổi hội thảo thành công tại Huế. Người tham dự rất hài lòng.");

        assertThat(result).isNotNull();
        assertThat(result.summary()).isNotBlank();
        assertThat(result.sentiment()).isIn("POSITIVE", "NEUTRAL", "NEGATIVE");
        assertThat(result.entities()).contains("Nguyễn Minh Anh");
    }

    @Test
    void extractsSecondSentenceIntoRecord() {
        ExtractedInfo result = extractionAiService.extract(
                "Đơn hàng của Trần Bình đến muộn ba ngày và hộp bị hỏng. Khách hàng không hài lòng.");

        assertThat(result).isNotNull();
        assertThat(result.summary()).isNotBlank();
        assertThat(result.sentiment()).isEqualTo("NEGATIVE");
    }
}
