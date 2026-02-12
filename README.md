# VideoLighter

[![Project License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey)](https://github.com/SmileonLabs/VideoLighter)

**VideoLighter**는 차세대 오프라인 동영상 압축 툴입니다. 최신 **SVT-AV1** 엔진을 사용하여 화질 저하를 최소화하면서도 용량을 극기적으로 줄여줍니다. 모든 작업은 로컬에서 이루어지므로 사생활 유출 걱정 없이 안전하게 사용할 수 있습니다.

---

## 🚀 주요 기능 (Key Features)

- **압도적인 압축 효율**: 최신 SVT-AV1 코덱을 사용하여 동일 화질 대비 용량을 최대 80% 이상 절감합니다.
- **터보 가속 모드 (Turbo Mode)**: 하드웨어 가속 및 최적화된 프리셋을 통해 압축 속도를 최대 3배 이상 향상시킵니다.
- **다중 파일 병렬 처리**: 여러 개의 파일을 동시에 압축하여 작업 시간을 단축합니다. (CPU 코어 수에 따른 최적화 지원)
- **크리에이터 팩 (Creator Pack)**:
  - **워터마크 추가**: 사용자 지정 텍스트를 영상에 삽입하여 저작권을 보호합니다.
  - **썸네일 자동 생성**: 압축 완료 시 가장 선명한 장면을 JPG로 자동 추출합니다.
- **100% 오프라인 & 프라이버시**: 영상이 서버로 전송되지 않습니다. 라이선스 확인을 제외한 모든 작업은 인터넷 연결 없이 가능합니다.
- **다국어 지원**: 한국어와 영어를 공식 지원하며, 다크/라이트 모드를 제공합니다.

---

## 🛠 기술 스택 (Tech Stack)

### Desktop App
- **Core Engine**: FFmpeg (SVT-AV1)
- **Framework**: [Tauri](https://tauri.app/) (Rust + React)
- **Frontend**: React + TypeScript + Vite
- **Styling**: Vanilla CSS (Premium Micro-interactions)
- **Icons**: Lucide React

### Infrastructure
- **Authentication/DB**: Supabase
- **License Management**: Polar.sh

---

## ⚖️ 라이선스 및 법적 고지 (License & Legal)

본 프로젝트는 **GNU General Public License v3.0**에 따라 공개된 오픈소스 소프트웨어입니다.

- **GitHub Repository**: [https://github.com/SmileonLabs/VideoLighter](https://github.com/SmileonLabs/VideoLighter)
- **GPL v3**: 본 프로그램을 수정하거나 배포할 경우, 동일한 GPL v3 라이선스에 따라 소스코드를 공개해야 합니다.
- **면책 조항**: 본 소프트웨어는 "있는 그대로(AS IS)" 제공되며, 사용 중 발생하는 데이터 유실이나 훼손에 대해 개발자는 기술적/물리적으로 복구해 줄 책임이 없습니다. 중요 데이터는 반드시 백업 후 사용하시기 바랍니다.

---

## 📦 설치 및 개발 (Installation)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/)
- FFmpeg (Sidecar 설정 필요)

### Development
```bash
cd desktop-app
npm install
npm run tauri dev
```

---

## ✉️ 지원 및 문의 (Support)
- **Developer**: Smileon Labs
- **Official Site**: [videolighter.smileon.app](https://videolighter.smileon.app)
- **Contact**: [contact@smileon.app](mailto:contact@smileon.app)

Copyright © 2026 Smileon Labs. All Rights Reserved.
