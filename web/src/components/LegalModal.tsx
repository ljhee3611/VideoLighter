import { X, Copy, Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'privacy' | 'terms' | 'contact';
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@smileon.app');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className={`relative w-full ${type === 'contact' ? 'max-w-md' : 'max-w-2xl'} max-h-[85vh] bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-2xl border border-[var(--card-border)] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col`}
                    >
                        <div className="px-6 py-5 border-b border-[var(--card-border)] flex justify-between items-center bg-black/5 dark:bg-white/5">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                {type === 'contact' && <Mail className="w-4 h-4 text-indigo-500" />}
                                {type === 'privacy' && t('legal.privacy_title')}
                                {type === 'terms' && t('legal.terms_title')}
                                {type === 'contact' && t('dashboard.support')}
                            </h2>
                            <button onClick={onClose} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-[var(--text-muted)]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 text-sm text-[var(--text-color)] leading-relaxed custom-scrollbar">
                            {type === 'contact' ? (
                                <div className="space-y-6 py-4">
                                    <p className="text-center font-medium text-[var(--text-muted)]">
                                        {t('history.refund_note')}
                                    </p>
                                    <div className="flex items-center gap-2 p-1.5 pl-4 bg-black/5 dark:bg-white/5 border border-[var(--card-border)] rounded-xl group transition-all focus-within:border-indigo-500/50">
                                        <code className="flex-1 font-mono font-bold text-indigo-500 truncate select-all">
                                            contact@smileon.app
                                        </code>
                                        <button
                                            onClick={handleCopyEmail}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all active:scale-95 cursor-pointer ${copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                                }`}
                                        >
                                            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            <span className="hidden sm:inline">{copied ? t('dashboard.active') : t('dashboard.copy')}</span>
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-center text-[var(--text-muted)] font-medium">
                                        © 2026 VideoLighter Support.
                                    </p>
                                </div>
                            ) : type === 'privacy' ? (
                                <div className="space-y-6 text-[var(--text-muted)]">
                                    <p>VideoLighter("서비스")는 사용자의 개인정보를 소중히 여기며, 이를 보호하기 위해 최선을 다합니다.</p>
                                    <section>
                                        <h3 className="text-base font-bold text-[var(--text-color)] mb-2">1. 개인정보 수집 방식</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>계정 식별: 이메일 주소</li>
                                            <li>결제 내역: 구매한 상품 및 라이선스 상태</li>
                                        </ul>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-indigo-500 mb-2">2. 데이터의 로컬 처리 원칙</h3>
                                        <p className="font-bold border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-500/5">
                                            VideoLighter가 처리하는 "비디오 파일"은 어떠한 경우에도 서버로 업로드되지 않습니다.
                                        </p>
                                        <p className="mt-2">모든 압축 및 최적화 작업은 사용자의 로컬 환경에서 이루어집니다.</p>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-[var(--text-color)] mb-2">3. 개인정보의 보유</h3>
                                        <p>사용자가 계정을 삭제하기 전까지 라이선스 관리를 위해 이메일 정보를 보유합니다.</p>
                                    </section>
                                </div>
                            ) : (
                                <div className="space-y-6 text-[var(--text-muted)]">
                                    <section>
                                        <h3 className="text-base font-bold text-[var(--text-color)] mb-2">1. 서비스 정의</h3>
                                        <p>VideoLighter는 사용자 자원을 활용하여 비디오 파일을 최적화하는 소프트웨어 라이선스를 제공합니다.</p>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-[var(--text-color)] mb-2">2. 라이선스 정책</h3>
                                        <p>평생 라이선스는 단일 계정에 귀속되며, 상업적/비상업적 용도로 무제한 사용 가능합니다.</p>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-indigo-500 mb-2">3. 환불 정책</h3>
                                        <p>결제일로부터 14일 이내, 기술적 결함으로 사용 불가능한 경우 환불 가능합니다.</p>
                                    </section>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-[var(--card-border)] bg-black/5 dark:bg-white/5 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 border border-[var(--card-border)] rounded-lg text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
                            >
                                {t('legal.close')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
