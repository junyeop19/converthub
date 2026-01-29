# ConvertHub Backend API

FastAPI 기반 백엔드 API

## 개발 환경 설정

### 1. 가상 환경 생성

```bash
python -m venv venv
```

### 2. 가상 환경 활성화

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. 의존성 설치

```bash
pip install -r requirements.txt
```

### 4. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일 생성:

```bash
copy .env.example .env
```

### 5. 서버 실행

```bash
uvicorn app.main:app --reload
```

서버가 http://localhost:8000 에서 실행됩니다.

## API 문서

서버 실행 후 아래 URL에서 자동 생성된 API 문서를 확인할 수 있습니다:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 엔드포인트

### Health Check
```
GET /health
```

응답:
```json
{
  "status": "healthy",
  "service": "ConvertHub API",
  "timestamp": "2026-01-30T12:00:00"
}
```

## Phase 2 기능 (예정)

- PDF 변환 API
- 파일 업로드/다운로드
- 배경 제거 (AI)
- OCR

## 배포

### Docker

```bash
docker build -t converthub-api .
docker run -p 8000:8000 converthub-api
```

### Railway/Render

1. GitHub 저장소 연결
2. Root directory를 `backend`로 설정
3. 자동 배포 시작
