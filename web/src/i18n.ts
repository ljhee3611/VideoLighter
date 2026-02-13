import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "nav": {
                        "features": "Features",
                        "pricing": "Pricing",
                        "dashboard": "Dashboard",
                        "login": "Login",
                        "logout": "Logout"
                    },
                    "hero": {
                        "badge": "VideoLighter v1.0.0 Release",
                        "title_1": "Quality Kept,",
                        "title_2": "Size Lost.",
                        "subtitle": "The smartest desktop video optimizer. Keep the visual quality you love while shedding the GBs you don't. 100% Offline & Private.",
                        "download": "Download for Windows",
                        "windows_only": "Supports Windows 10/11",
                        "macos_waiting": "macOS: Coming Soon",
                        "cta_get": "Get Lifetime Access",
                        "cta_see_pricing": "See Pricing",
                        "privacy_text": "VideoLighter handles everything locally without server uploads."
                    },
                    "features": {
                        "p1_title": "Subjective VQ Magic",
                        "p1_desc": "Not just math, but human vision. Focuses quality where your eyes notice most, reducing size without perceived loss.",
                        "p2_title": "3 Golden Presets",
                        "p2_desc": "One click is all it takes. Choose between Best Quality, Balanced, or Smallest Size for instant results.",
                        "p3_title": "Total Privacy",
                        "p3_desc": "Your videos never leave your PC. 100% offline processing with optional metadata & GPS cleaning."
                    },
                    "advanced_features": {
                        "hdr_title": "10-bit HDR Support",
                        "hdr_desc": "Preserve the vivid colors of iPhone/Galaxy HDR recordings without washout.",
                        "parallel_title": "Smart Parallel Processing",
                        "parallel_desc": "Harness your CPU power to compress multiple videos simultaneously at light speed."
                    },
                    "pricing": {
                        "title": "One-time purchase for lifetime possession.",
                        "desc": "No subscriptions or recurring payments. Own a powerful tool that stays on your desktop.",
                        "license_type": "Lifetime License",
                        "program_name": "VideoLighter v1.0.0",
                        "program_desc": "Professional video optimization in one lightweight package.",
                        "one_time": "One-time payment",
                        "cta_buy": "Buy & Download Now",
                        "cta_start": "Start with Google",
                        "benefit_1": "v1.0.0 Windows Installer",
                        "benefit_2": "Perceptual Quality Optimization",
                        "benefit_3": "Lifetime Updates & Support",
                        "benefit_4": "100% Offline & Secure"
                    },
                    "dashboard": {
                        "title": "Welcome",
                        "menu_dash": "Dashboard",
                        "menu_history": "History",
                        "license_status": "License Status",
                        "active_license": "Active License",
                        "license_desc": "Your lifetime license is active for unlimited use.",
                        "active": "Active",
                        "copy": "Copy",
                        "no_license": "No licenses found.",
                        "buy_product": "Purchase Product",
                        "buy_product_desc": "Purchase VideoLighter and activate your license.",
                        "download_app": "Download App",
                        "download_desc": "Download VideoLighter v1.0.0 for Windows.",
                        "download_now": "Download Now",
                        "support": "Support Center",
                        "support_desc": "Having trouble with installation or use?",
                        "contact_support": "Contact Support",
                        "billing": "Billing & Orders",
                        "billing_desc": "Manage your payments and invoices on Polar.",
                        "refund": "Request Refund",
                        "privacy_title_short": "Privacy Focused",
                        "privacy_desc_short": "No video leaves your device."
                    },
                    "history": {
                        "refund_note": "For any inquiries, please contact us at contact@smileon.app",
                        "translation_note": "Copy Email"
                    },
                    "legal": {
                        "privacy_title": "Privacy Policy",
                        "terms_title": "Terms of Service",
                        "close": "Close"
                    },
                    "seo": {
                        "title": "VideoLighter | Professional Desktop Video Optimizer",
                        "description": "VideoLighter v1.0.0: Compress large videos without quality loss. 100% Offline, Privacy-first, Subjective VQ optimization.",
                        "keywords": "video compressor, video optimizer, AV1 compression, VP9, storage saver, iPhone video compress, windows video tools"
                    },
                    "footer": {
                        "contact": "Contact: contact@smileon.app",
                        "copyright": "© 2026 Smileon Labs. All rights reserved."
                    }
                }
            },
            ko: {
                translation: {
                    "nav": {
                        "features": "기능",
                        "pricing": "가격",
                        "dashboard": "대시보드",
                        "login": "로그인",
                        "logout": "로그아웃"
                    },
                    "hero": {
                        "badge": "VideoLighter v1.0.0 정식 출시",
                        "title_1": "보이는 화질 그대로,",
                        "title_2": "용량만 다이어트.",
                        "subtitle": "가장 스마트한 데스크탑 영상 최적화 도구. 눈부신 화질은 그대로 유지하고, 불필요한 용량만 확실하게 덜어내세요. 100% 오프라인 & 프라이버시 보호.",
                        "download": "Windows용 다운로드",
                        "windows_only": "Windows 10/11 지원",
                        "macos_waiting": "macOS 버전 준비 중",
                        "cta_get": "평생 이용권 구매하기",
                        "cta_see_pricing": "가격 보기",
                        "privacy_text": "VideoLighter는 서버 업로드 없이 모든 작업을 컴퓨터 내에서 처리합니다."
                    },
                    "features": {
                        "p1_title": "인지 화질 최적화 (매직)",
                        "p1_desc": "단순한 계산이 아닌 사람의 시각 시스템에 맞춘 최적화. 얼굴과 주요 피사체의 화질은 지키고 용량은 획기적으로 줄입니다.",
                        "p2_title": "3가지 황금 프리셋",
                        "p2_desc": "복잡한 설정은 이제 그만. [최고화질 / 밸런스 / 용량우선] 버튼 하나로 용도에 맞는 최적의 결과물을 뽑아내세요.",
                        "p3_title": "완벽한 개인정보 보호",
                        "p3_desc": "영상이 내 컴퓨터를 절대 떠나지 않습니다. 100% 오프라인 처리 및 GPS 등 민감한 메타데이터 전면 삭제 옵션을 제공합니다."
                    },
                    "advanced_features": {
                        "hdr_title": "10-bit HDR 지원",
                        "hdr_desc": "아이폰/갤럭시로 촬영한 쨍한 HDR 영상의 색감을 물빠짐 없이 그대로 보존합니다.",
                        "parallel_title": "스마트 병렬 압축",
                        "parallel_desc": "강력한 CPU 성능을 활용하여 여러 개의 고화질 영상을 동시에, 빛의 속도로 변환합니다."
                    },
                    "pricing": {
                        "title": "한 번 구매로 평생 소장.",
                        "desc": "구독료나 반복 결제가 없습니다. 내 데스크탑에 머무는 강력한 도구를 소유하세요.",
                        "license_type": "평생 라이선스",
                        "program_name": "VideoLighter v1.0.0",
                        "program_desc": "전문적인 비디오 최적화를 위한 모든 기능이 하나의 가벼운 패키지에 담겨 있습니다.",
                        "one_time": "일회성 결제",
                        "cta_buy": "지금 구매 및 다운로드",
                        "cta_start": "구글로 시작하기",
                        "benefit_1": "v1.0.0 정식 설치 프로그램",
                        "benefit_2": "인지 화질 최적화 엔진 탑재",
                        "benefit_3": "평생 업데이트 및 기술 지원",
                        "benefit_4": "100% 오프라인 & 보안 처리"
                    },
                    "dashboard": {
                        "title": "환영합니다",
                        "menu_dash": "대시보드",
                        "menu_history": "구매 내역",
                        "license_status": "라이선스 상태",
                        "active_license": "활성 라이선스 보유 중",
                        "license_desc": "평생 라이선스가 활성화 되어 모든 기능을 제한 없이 사용할 수 있습니다.",
                        "active": "활성",
                        "copy": "복사",
                        "no_license": "보유하신 라이선스가 없습니다.",
                        "buy_product": "제품 구매하기",
                        "buy_product_desc": "VideoLighter를 구매하고 라이선스를 활성화하세요.",
                        "download_app": "앱 다운로드",
                        "download_desc": "Windows용 v1.0.0 정식 버전을 다운로드하세요.",
                        "download_now": "지금 다운로드",
                        "support": "도움말 센터",
                        "support_desc": "설치 및 사용 중 문제가 있으신가요?",
                        "contact_support": "지원팀 문의하기",
                        "billing": "결제 및 영수증 관리",
                        "billing_desc": "Polar 대시보드에서 결제 내역과 영수증을 확인하세요.",
                        "refund": "환불 요청",
                        "privacy_title_short": "개인정보 보호 중심",
                        "privacy_desc_short": "영상이 기기를 떠나지 않습니다."
                    },
                    "history": {
                        "refund_note": "모든 문의는 contact@smileon.app으로 메일 부탁드립니다.",
                        "mail_copy": "이메일 주소 복사"
                    },
                    "legal": {
                        "privacy_title": "개인정보 처리방침",
                        "terms_title": "서비스 이용 약관",
                        "close": "닫기"
                    },
                    "seo": {
                        "title": "VideoLighter | 보이는 화질 그대로, 용량만 줄이는 스마트한 동영상 압축",
                        "description": "VideoLighter v1.0.0 정식 출시! 인지 화질 최적화로 화질 손상 없이 대용량 영상을 압축하세요. 100% 오프라인, 평생 소장.",
                        "keywords": "동영상 압축, 영상 용량 줄이기, HDR 영상 압축, AV1 인코딩, 오프라인 영상 툴, 비디오 다이어트, 영상 최적화"
                    },
                    "footer": {
                        "contact": "문의 : contact@smileon.app",
                        "copyright": "© 2026 Smileon Labs. All rights reserved."
                    }
                }
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
