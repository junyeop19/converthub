# ConvertHub - Free Online File Converter

무료 온라인 파일 변환 도구 - 빠르고, 안전하며, 개인정보를 보호합니다.

## 📋 프로젝트 개요

ConvertHub는 브라우저에서 직접 파일을 변환하는 올인원 변환 도구입니다. 파일이 서버로 전송되지 않아 개인정보가 안전하게 보호됩니다.

## ✨ 주요 기능

### Phase 1 (현재)
- 🖼️ 이미지 포맷 변환 (JPG ↔ PNG ↔ WebP)
- 🗜️ 이미지 압축 (품질 조절 가능)
- 📏 이미지 리사이즈 (비율 유지 옵션)
- 🔒 개인정보 보호 (클라이언트 사이드 처리)
- ⚡ 빠른 처리 (업로드 불필요)

### Phase 2 (계획)
- 📄 PDF 변환 및 병합
- 🎨 배경 제거 (AI)
- 📝 OCR (광학 문자 인식)

## 🛠️ 기술 스택

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- browser-image-compression
- react-dropzone

### Backend (Phase 2)
- FastAPI (Python)
- Uvicorn
- Railway/Render 배포

## 🚀 시작하기

### Frontend 개발

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### Backend 개발 (Phase 2)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API 서버: http://localhost:8000

## 📦 배포

### Frontend (Cloudflare Pages)
- GitHub 연동으로 자동 배포
- Build command: `cd frontend && npm run build`
- Build output: `frontend/dist`

### Backend (Railway/Render)
- Dockerfile 기반 배포
- Health check: `/health` 엔드포인트

## 🔐 보안

- ✅ 클라이언트 사이드 파일 처리 (서버 업로드 없음)
- ✅ 자동 HTTPS (Cloudflare)
- ✅ 파일 타입 검증
- ✅ 파일 크기 제한 (50MB)
- ✅ XSS 방지

## 📄 라이선스

MIT License

## 👨‍💻 개발자

ConvertHub는 학습 및 수익화 실험을 위한 개인 프로젝트입니다.

---

**생성일**: 2026-01-30
**상태**: 개발 중
**버전**: Phase 1
