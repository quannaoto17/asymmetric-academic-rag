package com.rag.academic.eval;

import java.util.List;

public final class VietnameseBenchmarkDataset {

    private VietnameseBenchmarkDataset() {
    }

    public static List<VietnameseBenchmarkCase> cases() {
        return List.of(
                c("V01", "qa", "Quang hợp diễn ra chủ yếu ở bộ phận nào của tế bào thực vật?"),
                c("V02", "qa", "Một năm nhuận có bao nhiêu ngày? Trả lời ngắn gọn."),
                c("V03", "qa", "Vì sao nước biển có vị mặn? Giải thích cho học sinh lớp 6."),
                c("V04", "qa", "Thủ đô của Nhật Bản là gì?"),
                c("V05", "summary", "Tóm tắt trong một câu: Cây xanh hấp thụ khí carbon dioxide và nước. Nhờ năng lượng ánh sáng, cây tạo ra đường để phát triển, đồng thời giải phóng oxygen vào không khí."),
                c("V06", "summary", "Tóm tắt ý chính: Lan đi học bằng xe buýt mỗi ngày. Hôm nay xe đến muộn vì mưa lớn, nhưng Lan vẫn đến lớp trước giờ kiểm tra."),
                c("V07", "extraction", "Trích xuất họ tên, vai trò và địa điểm: Nguyễn Minh Anh, trưởng nhóm nghiên cứu, trình bày kết quả tại Đà Nẵng."),
                c("V08", "extraction", "Cuộc họp diễn ra ngày 12/09/2026 lúc 14:30 tại phòng B204. Hãy trích xuất ngày, giờ và địa điểm."),
                c("V09", "sentiment", "Đánh giá cảm xúc: Mình rất hài lòng vì nhóm hỗ trợ nhanh và giải quyết vấn đề tận tình."),
                c("V10", "sentiment", "Phân loại cảm xúc: Sản phẩm giao trễ, hộp bị móp và bộ phận chăm sóc khách hàng không phản hồi."),
                c("V11", "json", "Trả về JSON hợp lệ với các khóa ten_mon_hoc và so_tin_chi. Dữ liệu: Cơ sở dữ liệu, 3 tín chỉ. Không thêm markdown."),
                c("V12", "json", "Chuyển thành JSON có khóa task, priority, done: Viết báo cáo; cao; chưa hoàn thành. Chỉ trả JSON."),
                c("V13", "long", "Đọc nội dung và nêu đúng ba nguyên nhân khiến kế hoạch bị chậm: nhóm thiếu dữ liệu khảo sát trong tuần đầu; nhà cung cấp gửi thiết bị muộn bốn ngày; hai thành viên chủ chốt nghỉ do ốm. Sau đó nhóm đã phân công lại công việc, nhưng phần kiểm thử vẫn phải rút ngắn."),
                c("V14", "short", "Giải thích đệ quy trong tối đa 12 từ."),
                c("V15", "no_diacritics", "Tra loi khong dau: mat troi moc o huong nao?"),
                c("V16", "no_diacritics", "Tom tat mot cau: hom nay lop nghi hoc vi bao lon."),
                c("V17", "instruction", "Dịch sang tiếng Anh, giữ nguyên con số: Lớp có 42 sinh viên và 3 giảng viên."),
                c("V18", "reasoning", "Một quyển vở giá 8.000 đồng. Mua 5 quyển và trả 50.000 đồng thì được thối lại bao nhiêu? Nêu phép tính."),
                c("V19", "classification", "Phân loại câu sau là câu hỏi, yêu cầu hay nhận định: Hãy nộp bài trước thứ Sáu."),
                c("V20", "mixed", "Tóm tắt đánh giá sau thành tối đa 15 từ và cho biết cảm xúc: Bài giảng có ví dụ dễ hiểu, tuy nhiên âm thanh lúc đầu hơi nhỏ; nhìn chung tôi vẫn thấy buổi học hữu ích.")
        );
    }

    private static VietnameseBenchmarkCase c(String id, String category, String prompt) {
        return new VietnameseBenchmarkCase(id, category, prompt);
    }
}
