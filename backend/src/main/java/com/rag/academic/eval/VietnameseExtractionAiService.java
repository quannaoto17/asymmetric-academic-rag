package com.rag.academic.eval;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;

@AiService
public interface VietnameseExtractionAiService {

    @SystemMessage("""
            Bạn là trợ lý trích xuất thông tin tiếng Việt. Trả lời trung thực theo nội dung đầu vào.
            Tóm tắt tối đa 2 câu; sentiment chỉ nhận POSITIVE, NEUTRAL hoặc NEGATIVE.
            keyPoints và entities là danh sách; nếu không có thì trả danh sách rỗng.
            """)
    ExtractedInfo extract(@UserMessage String text);
}
