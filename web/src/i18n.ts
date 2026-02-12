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
                        "badge": "Desktop App for Windows",
                        "title_1": "The World's Lightest",
                        "title_2": "Desktop Video Optimizer",
                        "subtitle": "Compress large videos instantly on your computer. 100% Offline. Lifetime access for only $9.99 one-time.",
                        "download": "Download for Windows",
                        "windows_only": "Currently only for Windows 10/11",
                        "macos_waiting": "macOS: Coming Soon",
                        "cta_get": "Get Lifetime Access",
                        "cta_see_pricing": "See Pricing",
                        "privacy_text": "VideoLighter handles everything locally without server uploads."
                    },
                    "features": {
                        "p1_title": "Powerful Desktop Performance",
                        "p1_desc": "Go beyond web tools, utilizing your computer's resources to process large files stably.",
                        "p2_title": "Perfect Privacy",
                        "p2_desc": "Videos don't leave your computer. 100% offline without uploading or server logs.",
                        "p3_title": "Easy Operation",
                        "p3_desc": "Designed to optimize videos intuitively for anyone without complex settings."
                    },
                    "pricing": {
                        "title": "One-time purchase for lifetime possession.",
                        "desc": "No subscriptions or recurring payments. Own a powerful tool that stays on your desktop.",
                        "license_type": "Lifetime License",
                        "program_name": "VideoLighter License",
                        "program_desc": "Professional video optimization in one lightweight package.",
                        "one_time": "One-time payment",
                        "cta_buy": "Buy & Download Now",
                        "cta_start": "Start with Google",
                        "benefit_1": "Includes Windows 10/11 installer",
                        "benefit_2": "All future updates included",
                        "benefit_3": "Commercial use allowed"
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
                        "download_desc": "Download and install the latest Windows version.",
                        "download_now": "Download Now",
                        "support": "Support Center",
                        "support_desc": "Having trouble with installation or use?",
                        "contact_support": "Contact Support",
                        "billing": "Billing & Orders",
                        "billing_desc": "Manage your payments and invoices on Polar.",
                        "refund": "Request Refund"
                    },
                    "history": {
                        "refund_note": "For any inquiries, please contact us at contact@smileon.app",
                        "mail_copy": "Copy Email"
                    },
                    "legal": {
                        "privacy_title": "Privacy Policy",
                        "terms_title": "Terms of Service",
                        "close": "Close"
                    },
                    "seo": {
                        "title": "VideoLighter | World's Lightest Desktop Video Optimizer",
                        "description": "Compress large videos instantly on your computer. 100% Offline. Lifetime access for only $9.99 one-time. Perfect privacy, no server uploads.",
                        "keywords": "video compressor, video optimizer, desktop video tools, offline video compression, macos video optimizer, windows video optimizer"
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
                        "badge": "Windows용 데스크탑 앱",
                        "title_1": "세상에서 가장 가벼운",
                        "title_2": "데스크탑 비디오 최적화 프로그램",
                        "subtitle": "대용량 영상을 내 컴퓨터에서 즉시 압축하세요. 100% 오프라인. 9.99달러 단 한 번의 결제로 평생 이용하세요.",
                        "download": "Windows용 다운로드",
                        "windows_only": "현재 Windows 10/11만 지원합니다",
                        "macos_waiting": "macOS 버전은 준비 중입니다",
                        "cta_get": "평생 이용권 구매하기",
                        "cta_see_pricing": "가격 보기",
                        "privacy_text": "VideoLighter는 서버 업로드 없이 모든 작업을 컴퓨터 내에서 처리합니다."
                    },
                    "features": {
                        "p1_title": "데스크탑의 강력한 성능",
                        "p1_desc": "웹 도구의 한계를 넘어, 대용량 파일도 내 컴퓨터의 자원을 활용하여 안정적으로 처리합니다.",
                        "p2_title": "완벽한 개인정보 보호",
                        "p2_desc": "비디오가 컴퓨터를 떠나지 않습니다. 업로드나 서버 기록 없이 100% 오프라인으로 작동합니다.",
                        "p3_title": "간편한 조작",
                        "p3_desc": "복합한 설정 없이 누구나 직관적으로 비디오를 최적화할 수 있도록 설계되었습니다."
                    },
                    "pricing": {
                        "title": "한 번 구매로 평생 소장.",
                        "desc": "구독료나 반복 결제가 없습니다. 내 데스크탑에 머무는 강력한 도구를 소유하세요.",
                        "license_type": "평생 라이선스",
                        "program_name": "VideoLighter License",
                        "program_desc": "전문적인 비디오 최적화를 위한 모든 기능이 하나의 가벼운 패키지에 담겨 있습니다.",
                        "one_time": "일회성 결제",
                        "cta_buy": "지금 구매 및 다운로드",
                        "cta_start": "구글로 시작하기",
                        "benefit_1": "Windows 10/11용 설치 프로그램 포함",
                        "benefit_2": "모든 향후 업데이트 포함",
                        "benefit_3": "상업적 이용 가능"
                    },
                    "dashboard": {
                        "title": "환영합니다",
                        "menu_dash": "대시보드",
                        "menu_history": "구매 내역",
                        "license_status": "라이센스 상태",
                        "active_license": "활성 라이센스 보유중",
                        "license_desc": "평생 라이선스가 활성화 되어 모든 기능을 제한없이 사용할 수 있습니다.",
                        "active": "활성",
                        "copy": "복사",
                        "no_license": "보유하신 라이센스가 없습니다.",
                        "buy_product": "제품 구매하기",
                        "buy_product_desc": "VideoLighter를 구매하고 라이센스를 활성화하세요.",
                        "download_app": "앱 다운로드",
                        "download_desc": "Windows용 최신 버전을 다운로드하여 설치하세요.",
                        "download_now": "지금 다운로드",
                        "support": "도움말 센터",
                        "support_desc": "설치 및 사용 중 문제가 있으신가요?",
                        "contact_support": "지원팀 문의하기",
                        "billing": "결제 및 영수증 관리",
                        "billing_desc": "Polar 대시보드에서 결제 내역과 영수증을 확인하세요.",
                        "refund": "환불 요청"
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
                        "title": "VideoLighter | 세상에서 가장 가벼운 데스크탑 동영상 압축 프로그램",
                        "description": "대용량 영상을 영상 손실 없이 즉시 압축하세요. 100% 오프라인 작동으로 완벽한 보안을 보장합니다. $9.99 단 한 번의 결제로 평생 소장하세요.",
                        "keywords": "동영상 압축, 영상 용량 줄이기, 동영상 최적화, 오프라인 영상 압축, 비디오 라이터, 영상 다이어트"
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
