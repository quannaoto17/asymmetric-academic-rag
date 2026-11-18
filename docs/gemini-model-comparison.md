# Gemini model comparison

Generated: 2026-11-18T03:22:49.992832700Z

Dataset: 20 Vietnamese prompts (QA, summaries, extraction, sentiment, JSON, varied length and diacritics). Success means non-empty response. JSON validity is parsed for JSON prompts; record extraction is checked separately by the AiService integration test. Quota/rate-limit errors are counted from provider error messages.

## Summary

| Model | Success | Success rate | Avg latency (ms) | Avg total tokens | JSON valid | Quota/rate errors | Manual quality (1-5) |
|---|---:|---:|---:|---:|---:|---:|---:|
| gemini-3.1-flash-lite | 20/20 | 100% | 1214 | 116.2 | 2/2 | 0 | user-selected |
| gemini-3.5-flash-lite | 20/20 | 100% | 1113 | 98.7 | 2/2 | 0 | user-selected |

## Manual selection

Selected model: `gemini-3.1-flash-lite` (user choice). Reason: prioritize free-tier use and lower token consumption; retain this choice even though `gemini-3.5-flash-lite` was faster and used fewer tokens in this benchmark run.

## Prompt set

Use these prompts to judge the corresponding model responses below.

| ID | Category | Prompt |
|---|---|---|
| V01 | qa | Quang hợp diễn ra chủ yếu ở bộ phận nào của tế bào thực vật? |
| V02 | qa | Một năm nhuận có bao nhiêu ngày? Trả lời ngắn gọn. |
| V03 | qa | Vì sao nước biển có vị mặn? Giải thích cho học sinh lớp 6. |
| V04 | qa | Thủ đô của Nhật Bản là gì? |
| V05 | summary | Tóm tắt trong một câu: Cây xanh hấp thụ khí carbon dioxide và nước. Nhờ năng lượng ánh sáng, cây tạo ra đường để phát triển, đồng thời giải phóng oxygen vào không khí. |
| V06 | summary | Tóm tắt ý chính: Lan đi học bằng xe buýt mỗi ngày. Hôm nay xe đến muộn vì mưa lớn, nhưng Lan vẫn đến lớp trước giờ kiểm tra. |
| V07 | extraction | Trích xuất họ tên, vai trò và địa điểm: Nguyễn Minh Anh, trưởng nhóm nghiên cứu, trình bày kết quả tại Đà Nẵng. |
| V08 | extraction | Cuộc họp diễn ra ngày 12/09/2026 lúc 14:30 tại phòng B204. Hãy trích xuất ngày, giờ và địa điểm. |
| V09 | sentiment | Đánh giá cảm xúc: Mình rất hài lòng vì nhóm hỗ trợ nhanh và giải quyết vấn đề tận tình. |
| V10 | sentiment | Phân loại cảm xúc: Sản phẩm giao trễ, hộp bị móp và bộ phận chăm sóc khách hàng không phản hồi. |
| V11 | json | Trả về JSON hợp lệ với các khóa ten_mon_hoc và so_tin_chi. Dữ liệu: Cơ sở dữ liệu, 3 tín chỉ. Không thêm markdown. |
| V12 | json | Chuyển thành JSON có khóa task, priority, done: Viết báo cáo; cao; chưa hoàn thành. Chỉ trả JSON. |
| V13 | long | Đọc nội dung và nêu đúng ba nguyên nhân khiến kế hoạch bị chậm: nhóm thiếu dữ liệu khảo sát trong tuần đầu; nhà cung cấp gửi thiết bị muộn bốn ngày; hai thành viên chủ chốt nghỉ do ốm. Sau đó nhóm đã phân công lại công việc, nhưng phần kiểm thử vẫn phải rút ngắn. |
| V14 | short | Giải thích đệ quy trong tối đa 12 từ. |
| V15 | no_diacritics | Tra loi khong dau: mat troi moc o huong nao? |
| V16 | no_diacritics | Tom tat mot cau: hom nay lop nghi hoc vi bao lon. |
| V17 | instruction | Dịch sang tiếng Anh, giữ nguyên con số: Lớp có 42 sinh viên và 3 giảng viên. |
| V18 | reasoning | Một quyển vở giá 8.000 đồng. Mua 5 quyển và trả 50.000 đồng thì được thối lại bao nhiêu? Nêu phép tính. |
| V19 | classification | Phân loại câu sau là câu hỏi, yêu cầu hay nhận định: Hãy nộp bài trước thứ Sáu. |
| V20 | mixed | Tóm tắt đánh giá sau thành tối đa 15 từ và cho biết cảm xúc: Bài giảng có ví dụ dễ hiểu, tuy nhiên âm thanh lúc đầu hơi nhỏ; nhìn chung tôi vẫn thấy buổi học hữu ích. |

## Per-prompt results

### gemini-3.1-flash-lite

| ID | Category | Latency (ms) | Input tokens | Output tokens | Success | Output check | Error / response preview |
|---|---|---:|---:|---:|---|---|---|
| V01 | qa | 1639 | 18 | 81 | yes | response received | Quang hợp diễn ra chủ yếu ở **lục lạp** (chloroplast) của tế bào thực vật.  Trong lục lạp, quá trình này tập trung chủ yếu ở các **thylakoid** (nơi chứa diệp lục để hấp thụ ánh sáng) và **chất nền (stroma)** (nơi diễn ra các phản ứng tổng hợp chất hữu cơ). |
| V02 | qa | 752 | 16 | 11 | yes | response received | Một năm nhuận có 366 ngày. |
| V03 | qa | 2505 | 19 | 503 | yes | response received | Chào các em học sinh lớp 6! Để hiểu vì sao nước biển lại mặn, chúng ta hãy cùng tưởng tượng một "hành trình" của nước nhé.  Các em có thể giải thích hiện tượng này qua 3 bước đơn giản sau:  ### 1. Nước mưa "gặm nhấm" đá trên đất liền Mọi chuyện bắt đầu từ những cơn mưa. Trong nước mưa có chứa một lượng nhỏ khí CO2, tạo thành một loại axit rất yếu. Khi nước mưa rơi xuống núi và chảy qua các khe đá, chất axit này làm các loại đá bị "bào mòn" dần dần.  Trong đá có chứa rất nhiều **muối khoáng**. Khi đá bị bào mòn, các chất muối này được giải phóng và hòa tan vào dòng nước.  ### 2. Các con sông là "người vận chuyển" Sau khi hòa tan muối từ đá, nước mưa chảy vào các con suối, rồi đổ ra các con sông lớn. Trong quá trình chảy, các con sông này tiếp tục cuốn theo thêm nhiều khoáng chất và muối từ đất đá dọc hai bên bờ. Cuối cùng, tất cả dòng sông đều đổ ra biển.  ### 3. Biển là "cái túi" khổng lồ không có lối thoát Đây là lý do quan trọng nhất: *   Khi nước sông đổ ra biển, nó mang theo muối. *   Dưới ánh nắng mặt trời, nước biển bốc hơi để tạo thành mây và mưa, nhưng **muối thì không bốc hơi được**. *   Muối ở lại trong lòng đại dương. Cứ như vậy, qua hàng tỷ năm, lượng muối tích tụ ngày … |
| V04 | qa | 1010 | 10 | 10 | yes | response received | Thủ đô của Nhật Bản là **Tokyo**. |
| V05 | summary | 1005 | 43 | 30 | yes | response received | Cây xanh sử dụng ánh sáng mặt trời để chuyển hóa carbon dioxide và nước thành đường nuôi cây, đồng thời giải phóng oxygen ra môi trường. |
| V06 | summary | 1164 | 37 | 74 | yes | response received | Dưới đây là các cách tóm tắt ý chính của câu trên:  * **Cách 1 (Ngắn gọn):** Dù xe buýt đến muộn do mưa, Lan vẫn kịp đến lớp kiểm tra. * **Cách 2 (Súc tích):** Lan vẫn kịp giờ kiểm tra dù xe buýt bị trễ vì mưa. |
| V07 | extraction | 802 | 32 | 46 | yes | response received | Dưới đây là thông tin đã được trích xuất:  *   **Họ tên:** Nguyễn Minh Anh *   **Vai trò:** Trưởng nhóm nghiên cứu *   **Địa điểm:** Đà Nẵng |
| V08 | extraction | 2142 | 43 | 59 | yes | response received | Dưới đây là thông tin đã được trích xuất từ yêu cầu của bạn:  *   **Ngày:** 12/09/2026 *   **Giờ:** 14:30 *   **Địa điểm:** Phòng B204 |
| V09 | sentiment | 1164 | 24 | 120 | yes | response received | Đánh giá cảm xúc của câu này là: **Tích cực (Positive).**  **Phân tích chi tiết:** *   **Từ khóa cảm xúc:** "rất hài lòng". *   **Lý do:** Nhóm "hỗ trợ nhanh" và "giải quyết vấn đề tận tình". *   **Mức độ:** Cao (thể hiện qua từ "rất").  Đây là một phản hồi mang tính khích lệ cao, cho thấy khách hàng/người dùng có trải nghiệm dịch vụ tốt và cảm thấy được tôn trọng. |
| V10 | sentiment | 1853 | 28 | 378 | yes | response received | Cảm xúc của khách hàng trong trường hợp này có thể được phân loại như sau:  **1. Phân loại theo trạng thái cảm xúc:** *   **Tiêu cực (Negative):** Đây là cảm xúc chủ đạo. *   **Bực bội/Khó chịu (Frustrated):** Do trải nghiệm mua sắm không như mong đợi (giao trễ, hàng hỏng). *   **Thất vọng (Disappointed):** Do kỳ vọng về sản phẩm và dịch vụ không được đáp ứng. *   **Tức giận (Angry):** Do thái độ im lặng, thiếu trách nhiệm từ bộ phận chăm sóc khách hàng.  **2. Phân loại theo mức độ:** *   **Mức độ cao:** Đây là tình huống gây ức chế mạnh vì khách hàng gặp phải "combo" lỗi: lỗi sản phẩm (hộp móp), lỗi vận chuyển (giao trễ) và lỗi dịch vụ (không phản hồi). Điều này dễ dẫn đến việc khách hàng mất lòng tin và có khả năng cao sẽ đánh giá 1 sao hoặc tẩy chay thương hiệu.  **3. Phân loại theo nguyên nhân (Gốc rễ vấn đề):** *   **Vấn đề vận hành:** Giao hàng trễ. *   **Vấn đề chất lượng:** Hàng hóa hư hại (hộp móp). *   **Vấn đề dịch vụ:** Thiếu sự hỗ trợ, thiếu kết nối (không phản hồi).  **Tóm tắt:** Đây là một **trải nghiệm khách hàng tồi tệ (Poor Customer Experience)**. Khách hàng đang ở trạng thái **"cần được giải quyết ngay lập tức"** và có nguy cơ cao trở thành **"khách hàng rời bỏ" … |
| V11 | json | 1818 | 39 | 28 | yes | yes | { "ten_mon_hoc": "Cơ sở dữ liệu", "so_tin_chi": 3 } |
| V12 | json | 1131 | 29 | 33 | yes | yes | {   "task": "Viết báo cáo",   "priority": "cao",   "done": "chưa hoàn thành" } |
| V13 | long | 827 | 69 | 62 | yes | response received | Dựa trên nội dung bạn cung cấp, ba nguyên nhân khiến kế hoạch bị chậm là:  1. Nhóm thiếu dữ liệu khảo sát trong tuần đầu. 2. Nhà cung cấp gửi thiết bị muộn bốn ngày. 3. Hai thành viên chủ chốt nghỉ do ốm. |
| V14 | short | 1004 | 14 | 17 | yes | response received | Đệ quy là hàm tự gọi chính nó để giải quyết bài toán nhỏ hơn. |
| V15 | no_diacritics | 850 | 16 | 9 | yes | response received | mat troi moc o huong dong. |
| V16 | no_diacritics | 634 | 15 | 9 | yes | response received | Lớp nghỉ học vì bão lớn. |
| V17 | instruction | 878 | 26 | 60 | yes | response received | Bạn có thể dịch câu này sang tiếng Anh theo các cách sau:  *   **Cách thông dụng nhất:** "The class has 42 students and 3 lecturers." *   **Cách diễn đạt khác:** "There are 42 students and 3 lecturers in the class." |
| V18 | reasoning | 1281 | 41 | 146 | yes | response received | Để tính số tiền được thối lại, chúng ta thực hiện các bước sau:  1. **Tính số tiền mua 5 quyển vở:**    8.000 × 5 = 40.000 (đồng)  2. **Tính số tiền được thối lại:**    50.000 - 40.000 = 10.000 (đồng)  **Phép tính gộp:** 50.000 - (8.000 × 5) = 10.000 (đồng)  **Đáp số:** Bạn được thối lại **10.000 đồng**. |
| V19 | classification | 1160 | 25 | 28 | yes | response received | Câu "Hãy nộp bài trước thứ Sáu" được phân loại là **câu yêu cầu** (hoặc câu cầu khiến). |
| V20 | mixed | 663 | 47 | 29 | yes | response received | Tóm tắt: Bài giảng hữu ích, ví dụ dễ hiểu dù âm thanh đầu hơi nhỏ. Cảm xúc: Tích cực. |

### gemini-3.5-flash-lite

| ID | Category | Latency (ms) | Input tokens | Output tokens | Success | Output check | Error / response preview |
|---|---|---:|---:|---:|---|---|---|
| V01 | qa | 1991 | 18 | 64 | yes | response received | Quang hợp diễn ra chủ yếu ở **lục lạp (chloroplast)** - một loại bào quan nằm trong tế bào thực vật.   Trong các cơ quan của thực vật, quang hợp diễn ra chủ yếu ở **lá cây**, nơi tập trung số lượng lớn các tế bào chứa lục lạp. |
| V02 | qa | 1664 | 16 | 11 | yes | response received | Một năm nhuận có **366 ngày**. |
| V03 | qa | 3485 | 19 | 538 | yes | response received | Chào các em học sinh lớp 6! Chắc hẳn khi đi tắm biển, hay nếm thử một chút nước biển, các em đều thấy nó có vị mặn đắng phải không nào?   Vậy vì sao nước biển lại mặn như vậy? Bí mật nằm ở một cuộc hành trình rất dài của nước và đất đá. Các em có thể hiểu đơn giản qua 3 bước sau đây nhé:  ### 1. Nước mưa không ngọt hoàn toàn như chúng ta tưởng Các em biết vòng tuần hoàn của nước chứ? Nước từ biển bốc hơi lên trời tạo thành mây, rồi mây rơi xuống thành **nước mưa**.   Nước mưa khi rơi xuống đất là nước ngọt. Nhưng trên đường chảy qua các con sông, suối để trở về biển, nước mưa đã hòa tan các loại **khoáng chất và muối** có sẵn trong đất đá.  ### 2. Sự tích tụ qua hàng triệu năm Những con sông cứ chảy, mang theo một lượng nhỏ muối và khoáng chất đổ ra biển hết năm này qua năm khác, từ hàng triệu năm nay.   Có thể các em sẽ thắc mắc: *"Thế sao sông cũng chảy ra biển mà nước sông không mặn?"*  Đó là vì dòng nước sông luôn chảy đi, lượng muối ở sông rất loãng nên chúng ta không thấy mặn. Còn biển thì giống như một cái "túi đựng" khổng lồ, là điểm đến cuối cùng của tất cả các dòng sông.  ### 3. Bí mật ở sự "Bốc hơi" Nước từ các đại dương liên tục hấp thụ sức nóng của Mặt Trời để bốc hơi … |
| V04 | qa | 835 | 10 | 10 | yes | response received | Thủ đô của Nhật Bản là **Tokyo**. |
| V05 | summary | 652 | 43 | 31 | yes | response received | Cây xanh sử dụng carbon dioxide, nước và năng lượng ánh sáng để tạo ra đường giúp phát triển, đồng thời giải phóng oxygen ra môi trường. |
| V06 | summary | 1012 | 37 | 35 | yes | response received | Ý chính của đoạn văn:  **Lan đi học bằng xe buýt gặp trời mưa khiến xe đến muộn, nhưng cô vẫn kịp đến lớp trước giờ kiểm tra.** |
| V07 | extraction | 825 | 32 | 48 | yes | response received | Dựa trên câu bạn cung cấp, thông tin được trích xuất như sau:  * **Họ tên:** Nguyễn Minh Anh * **Vai trò:** Trưởng nhóm nghiên cứu * **Địa điểm:** Đà Nẵng |
| V08 | extraction | 652 | 43 | 56 | yes | response received | Dựa trên thông tin bạn cung cấp, đây là kết quả trích xuất:  * **Ngày:** 12/09/2026 * **Giờ:** 14:30 * **Địa điểm:** Phòng B204 |
| V09 | sentiment | 996 | 24 | 104 | yes | response received | Dựa trên nội dung câu nói, đánh giá cảm xúc là: **Tích cực (Rất hài lòng)**.   **Chi tiết:** * **Từ ngữ tích cực:** *"rất hài lòng"*, *"hỗ trợ nhanh"*, *"giải quyết vấn đề tận tình"*. * **Ý nghĩa:** Người nói đang dành lời khen ngợi và bày tỏ thái độ biết ơn, sự hài lòng cao đối với chất lượng dịch vụ hoặc cách làm việc của nhóm hỗ trợ. |
| V10 | sentiment | 1002 | 28 | 143 | yes | response received | Dựa trên nội dung phản hồi, cảm xúc của khách hàng có thể được phân loại như sau:  *   **Cảm xúc chính:** **Tiêu cực (Negative)** *   **Các cung bậc cảm xúc cụ thể:**     *   **Tức giận/Bực bội (Angry/Frustrated):** Do dịch vụ chăm sóc khách hàng không phản hồi và giao hàng trễ.     *   **Thất vọng (Disappointed):** Do chất lượng đóng gói kém khiến hộp bị móp méo.  **Tóm lại:** Đây là một phản hồi mang tính **khiếu nại/bất bình cao** về trải nghiệm mua hàng. |
| V11 | json | 657 | 39 | 36 | yes | yes | [   {     "ten_mon_hoc": "Cơ sở dữ liệu",     "so_tin_chi": 3   } ] |
| V12 | json | 664 | 29 | 38 | yes | yes | ```json {   "task": "Viết báo cáo",   "priority": "cao",   "done": "chưa hoàn thành" } ``` |
| V13 | long | 1176 | 69 | 53 | yes | response received | Ba nguyên nhân khiến kế hoạch bị chậm là:  1. Nhóm thiếu dữ liệu khảo sát trong tuần đầu. 2. Nhà cung cấp gửi thiết bị muộn bốn ngày. 3. Hai thành viên chủ chốt nghỉ do ốm. |
| V14 | short | 647 | 14 | 14 | yes | response received | Hàm gọi lại chính nó để giải quyết bài toán nhỏ hơn. |
| V15 | no_diacritics | 1330 | 16 | 1 | yes | response received | dong |
| V16 | no_diacritics | 1166 | 15 | 11 | yes | response received | Hôm nay lớp nghỉ học vì bão lớn. |
| V17 | instruction | 832 | 26 | 38 | yes | response received | Câu dịch chuẩn xác nhất là:  **"The class has 42 students and 3 lecturers."**  *(Hoặc dùng từ **instructors** cho giảng viên).* |
| V18 | reasoning | 1031 | 41 | 101 | yes | response received | **Phép tính:**  1. Số tiền mua 5 quyển vở là:     $8.000 \times 5 = 40.000$ (đồng)  2. Số tiền được thối lại là:     $50.000 - 40.000 = 10.000$ (đồng)  **Đáp số:** Được thối lại **10.000 đồng**. |
| V19 | classification | 789 | 25 | 16 | yes | response received | Câu này thuộc loại **yêu cầu** (hoặc câu cầu khiến). |
| V20 | mixed | 845 | 47 | 35 | yes | response received | - Tóm tắt (10 từ): Bài giảng hữu ích, ví dụ dễ hiểu, âm thanh lúc đầu nhỏ. - Cảm xúc: Tích cực. |

## Manual quality review

Score each model from 1 (incorrect or unusable) to 5 (accurate, follows the request, and natural Vietnamese). Leave scores blank until reviewed. For structured output, verify fields and JSON/record shape.

## Quota and limitations

Quota errors are identified from failed responses containing 429, RESOURCE_EXHAUSTED, quota, or rate-limit markers. This run does not reveal the full project quota or remaining daily allowance; consult the Google AI Studio or Google Cloud quota page for that.
