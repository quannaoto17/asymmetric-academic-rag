# Asymmetric Academic RAG Platform

Hệ thống **Asymmetric Academic RAG** hỗ trợ sinh viên IT đối chiếu tài liệu **CHÍNH (`PRIMARY` - Slide bài giảng, Đề cương)** với tài liệu **PHỤ (`SECONDARY` - Sách giáo trình tiếng Anh)**, phát hiện sai lệch kiến thức hoặc lược bỏ điều kiện biên, giải đáp song ngữ Anh–Việt (khóa thuật ngữ gốc) và sinh bộ câu hỏi ôn tập bám sát phạm vi bài giảng.

## Kiến trúc & Tech Stack

- **Backend:** Java 21 (Virtual Threads), Spring Boot 3.4+, Maven, Springdoc OpenAPI (`/v3/api-docs`), Flyway
- **AI & Orchestration:** LangChain4j (`langchain4j-spring-boot-starter`, `langchain4j-google-ai-gemini`, `langchain4j-pgvector`)
  - Embedding: `gemini-embedding-001` (768 dimensions)
  - LLM Reasoning & Structured JSON Output: `gemini-2.5-flash` (temperature `0.2`)
- **Document Parsing:** Apache POI (`.pptx`), Apache PDFBox (`.pdf`), tùy chọn `docling-serve` (Docker profile `docling`)
- **Database:** PostgreSQL 16 + `pgvector` (HNSW vector cosine + Full-Text `tsvector` + RRF)
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, `shadcn/ui`, `openapi-typescript` + `openapi-fetch`
- **CI/CD & Testing:** Docker Compose, GitHub Actions, Testcontainers (`pgvector/pgvector:pg16`)

## Cấu trúc Monorepo

```text
.
├── .github/                  # GitHub Actions CI workflows & PR template
├── backend/                  # Spring Boot 3.4 + LangChain4j + Flyway + Testcontainers
├── frontend/                 # Next.js 15 App Router + shadcn/ui + OpenAPI typed client
├── eval/                     # Bộ dữ liệu đánh giá (gold/) và kết quả (results/)
├── docker/postgres/          # Script khởi tạo pgvector
├── docker-compose.yml        # Cụm dịch vụ dev (postgres, backend, frontend, profile docling)
└── .env.example              # Biến môi trường mẫu
```

## Khởi chạy nhanh với Docker Compose

1. Tạo file `.env` từ mẫu:
   ```bash
   cp .env.example .env
   ```
   Cập nhật `GEMINI_API_KEY` trong `.env` nếu sử dụng các tính năng LLM/Embedding thực tế.

2. Khởi chạy toàn bộ cụm dịch vụ:
   ```bash
   docker compose up --build -d
   ```
   Kiểm tra với profile `docling` (tùy chọn):
   ```bash
   docker compose --profile docling up --build -d
   ```

3. Truy cập các dịch vụ:
   - Frontend: `http://localhost:3000`
   - Backend Health: `http://localhost:8080/api/v1/health`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - OpenAPI Spec: `http://localhost:8080/v3/api-docs`

## Phát triển cục bộ (Local Development)

### Backend
Yêu cầu JDK 21 và Docker (cho Testcontainers):
```bash
cd backend
./mvnw -B verify
./mvnw spring-boot:run
```

### Frontend
Yêu cầu Node.js 20+:
```bash
cd frontend
npm ci
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Đồng bộ TypeScript API client từ OpenAPI của Backend (khi Backend đang chạy ở `localhost:8080`):
```bash
cd frontend
npm run generate:api
```

## Quy ước Git & Pull Request

- Nhánh `main` được bảo vệ (**Protected**): không push trực tiếp lên `main`.
- Tạo nhánh mới từ `main` theo quy ước: `feat/<ten-tinh-nang>`, `fix/<ten-loi>`, `chore/<cau-hinh>`.
- Mở Pull Request về `main` và đảm bảo cả `Backend CI` (`build-and-test`) và `Frontend CI` (`lint-and-build`) đều đạt trước khi merge.
