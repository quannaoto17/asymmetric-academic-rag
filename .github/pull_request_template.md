## Mô tả thay đổi / Summary
<!-- Mô tả ngắn gọn các thay đổi trong PR này và ngữ cảnh liên quan -->

## Loại thay đổi / Type of Change
- [ ] `feat`: Tính năng mới
- [ ] `fix`: Sửa lỗi
- [ ] `chore`: Cấu hình, CI/CD, dependency, tài liệu
- [ ] `refactor`: Tái cấu trúc mã nguồn (không thay đổi hành vi)

## Checklist kiểm tra trước khi Merge
- [ ] Backend build và chạy test thành công (`cd backend && ./mvnw -B verify`)
- [ ] Frontend lint, type-check và build thành công (`cd frontend && npm run lint && npx tsc --noEmit && npm run build`)
- [ ] Nếu thay đổi API Backend: đã đồng bộ OpenAPI schema cho Frontend (`npm run generate:api`)
- [ ] Nếu thay đổi Database: đã bổ sung Flyway migration mới (`V*__*.sql`), không sửa migration cũ
- [ ] Không commit file `.env`, PDF/PPTX bài giảng, hoặc dữ liệu nhạy cảm
