# VideoLighter

## 서비스 개요
- **서비스 명**: VideoLighter
- **형태**: 데스크탑 애플리케이션
- **주요 기능**: 비디오 파일 압축 (Video Compression)

## 기술 스택
- **Web Frontend**: React (Vite + TypeScript)
- **Backend/DB**: Supabase (Auth, Database, Edge Functions)
- **Payment**: Polar (License management)
- **Animation**: Framer Motion
- **Icon**: Lucide React

## 아키텍처 및 데이터 흐름
1. **인증**: Supabase Auth (Google OAuth) 사용.
2. **결제**: Polar Checkout 연동. 유저 기반 결제 유도.
3. **라이센스 발급**: Polar Webhook -> Supabase Edge Function (`polar-webhook`) -> `licenses` 테이블 삽입.
4. **마이페이지**: Supabase Realtime/Query를 통해 유저의 `licenses` 정보를 즉시 화면에 노출.

## 히스토리
- 2026-02-12: 서비스 정의 및 `project.md` 생성 (이도도 실장)
- 2026-02-12: 웹 서비스 요구사항 정의 (React, Supabase, Polar) (이도도 실장)
- 2026-02-12: 웹 서비스 인프라 및 UI/UX 핵심 기능 구현 완료 (이도도 실장)
