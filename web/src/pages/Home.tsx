import { useState, useEffect } from 'react';
import { Zap, Sun, Moon, Menu, Check, Download, Monitor, Lock, MousePointer2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import LegalModal from '../components/LegalModal';
import SEO from '../components/SEO';

const Navbar = ({ user, signInWithGoogle, signOut }: any) => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] px-4 md:px-6 py-3 md:py-4 transition-all glass border-b border-[var(--card-border)] shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 md:w-10 md:h-10 border rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform bg-black border-white/10">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-color)]">VideoLighter</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-6 text-sm font-medium mr-4">
                        <a href="#features" className="transition-colors text-[var(--text-muted)] hover:text-[var(--text-color)] cursor-pointer">{t('nav.features')}</a>
                        <a href="#pricing" className="transition-colors text-[var(--text-muted)] hover:text-[var(--text-color)] cursor-pointer">{t('nav.pricing')}</a>
                    </div>
                    <div className="h-6 w-[1px] bg-[var(--card-border)]"></div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl border border-[var(--card-border)] text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-color)] transition-all cursor-pointer"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <div className="flex border rounded-xl overflow-hidden p-1 bg-black/5 dark:bg-white/5 border-[var(--card-border)]">
                            <button onClick={() => changeLanguage('ko')} className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${i18n.language === 'ko' ? 'bg-indigo-600 text-white' : 'text-[var(--text-muted)]'}`}>KR</button>
                            <button onClick={() => changeLanguage('en')} className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${i18n.language === 'en' ? 'bg-indigo-600 text-white' : 'text-[var(--text-muted)]'}`}>EN</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-2">
                        {user ? (
                            <>
                                <Link to="/mypage" className="text-sm font-bold px-4 py-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-color)] cursor-pointer">{t('nav.dashboard')}</Link>
                                <button onClick={() => signOut()} className="text-sm font-bold px-4 py-2 transition-all text-[var(--text-muted)] hover:text-red-500 cursor-pointer">{t('nav.logout')}</button>
                            </>
                        ) : (
                            <button onClick={() => signInWithGoogle()} className="text-sm font-bold px-4 py-2 transition-all text-[var(--text-muted)] hover:text-[var(--text-color)] cursor-pointer border border-[var(--card-border)] rounded-xl hover:bg-black/5 dark:hover:bg-white/5">{t('nav.login')}</button>
                        )}
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-2">
                    <button onClick={toggleTheme} className="p-2 rounded-lg transition-all text-[var(--text-muted)] cursor-pointer">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg transition-all text-[var(--text-color)] cursor-pointer">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-color)] border-b border-[var(--card-border)] p-4 flex flex-col gap-4 shadow-xl">
                    <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 cursor-pointer">{t('nav.features')}</a>
                    <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium p-2 cursor-pointer">{t('nav.pricing')}</a>
                    <div className="h-[1px] bg-[var(--card-border)] w-full"></div>
                    {user ? (
                        <>
                            <Link to="/mypage" className="text-sm font-bold p-2 text-indigo-500">{t('nav.dashboard')}</Link>
                            <button onClick={() => signOut()} className="text-sm font-bold p-2 text-red-500 text-left cursor-pointer">{t('nav.logout')}</button>
                        </>
                    ) : (
                        <button onClick={() => signInWithGoogle()} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer">{t('nav.login')}</button>
                    )}
                </div>
            )}
        </nav>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
    <div className="p-8 rounded-3xl border transition-all group glass border-[var(--card-border)] hover:border-indigo-500/30">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all bg-indigo-600/10 text-indigo-400">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">{title}</h3>
        <p className="leading-relaxed text-sm text-[var(--text-muted)]">{desc}</p>
    </div>
);

const Home = () => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [hasLicense, setHasLicense] = useState(false);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
    const [legalModelType, setLegalModalType] = useState<'privacy' | 'terms' | 'contact'>('privacy');

    useEffect(() => {
        if (user) {
            checkLicense();
        } else {
            setHasLicense(false);
        }
    }, [user]);

    const checkLicense = async () => {
        const { data, error } = await supabase
            .from('licenses')
            .select('id')
            .eq('user_id', user?.id)
            .limit(1);

        if (!error && data && data.length > 0) {
            setHasLicense(true);
        }
    };

    const handlePayment = () => {
        if (!user) {
            signInWithGoogle();
            return;
        }

        if (hasLicense) {
            navigate('/mypage');
            return;
        }

        const checkoutUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL;

        if (!checkoutUrl) {
            alert('Payment link is not configured. Please check VITE_POLAR_CHECKOUT_URL in .env');
            return;
        }

        const finalUrl = `${checkoutUrl}?customer_email=${encodeURIComponent(user.email || '')}`;
        window.location.href = finalUrl;
    };

    const openLegal = (type: 'privacy' | 'terms' | 'contact') => {
        setLegalModalType(type);
        setIsLegalModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-indigo-500/30">
            <SEO />
            <Navbar user={user} signInWithGoogle={signInWithGoogle} signOut={signOut} />

            <main className="relative">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 -left-20 w-72 h-72 blur-[120px] rounded-full bg-indigo-600/20"></div>
                    <div className="absolute bottom-0 -right-20 w-72 h-72 blur-[120px] rounded-full bg-purple-600/20"></div>

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 border px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-6 uppercase tracking-wider bg-white/5 border-[var(--card-border)] text-[var(--text-muted)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-indigo-500"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            {t('hero.badge')}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-7xl font-extrabold leading-[1.15] mb-6 md:mb-8 text-[var(--text-color)]"
                        >
                            {t('hero.title_1')} <br />
                            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent text-shadow-glow">
                                {t('hero.title_2')}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed text-[var(--text-muted)] font-medium"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            {hasLicense ? (
                                <button
                                    onClick={() => navigate('/mypage')}
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-2xl bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer shadow-indigo-600/20"
                                >
                                    <Download className="w-5 h-5" />
                                    {t('hero.download')}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handlePayment}
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-2xl bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer shadow-indigo-600/20"
                                    >
                                        <Zap className="w-5 h-5" />
                                        {t('hero.cta_get')}
                                    </button>
                                    <a
                                        href="#pricing"
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all border border-[var(--card-border)] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-center"
                                    >
                                        {t('hero.cta_see_pricing')}
                                    </a>
                                </>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 flex flex-col items-center gap-2"
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-500 bg-indigo-500/5 px-4 py-2 rounded-full border border-indigo-500/10 mb-1">
                                <AlertCircle className="w-4 h-4" />
                                {t('hero.windows_only')}
                            </div>
                            <div className="text-xs font-medium text-[var(--text-muted)]">
                                {t('hero.macos_waiting')}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 relative"
                        >
                            <div className="rounded-3xl p-3 max-w-5xl mx-auto shadow-2xl relative overflow-hidden group border glass border-[var(--card-border)]">
                                <div className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden bg-black">
                                    <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200" alt="App Preview" className="w-full h-full object-cover opacity-40"></img>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                        <div className="w-20 h-20 backdrop-blur-xl rounded-3xl border flex items-center justify-center mb-6 shadow-2xl bg-indigo-600/10 border-indigo-600/20">
                                            <Zap className="w-10 h-10 text-indigo-500" />
                                        </div>
                                        <p className="max-w-xs text-sm md:text-base font-medium text-gray-400">{t('hero.privacy_text')}</p>
                                    </div>
                                    <div className="hidden sm:block absolute bottom-6 right-6 px-6 py-4 rounded-2xl border animate-float glass border-indigo-500/30">
                                        <p className="text-[10px] text-indigo-500 uppercase font-black tracking-[0.2em] mb-1">LOCAL PROCESSING</p>
                                        <p className="text-lg font-bold text-white">100% Privacy</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-6 bg-[var(--bg-secondary)]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <FeatureCard icon={Monitor} title={t('features.p1_title')} desc={t('features.p1_desc')} />
                            <FeatureCard icon={Lock} title={t('features.p2_title')} desc={t('features.p2_desc')} />
                            <FeatureCard icon={MousePointer2} title={t('features.p3_title')} desc={t('features.p3_desc')} />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 px-6">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">{t('pricing.title')}</h2>
                        <p className="max-w-2xl mx-auto text-[var(--text-muted)] font-medium">{t('pricing.desc')}</p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative p-8 md:p-12 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center glass border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.1)] bg-[var(--card-bg)]">
                            <div className="absolute -top-4 text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest bg-indigo-600 text-white shadow-lg">
                                {t('pricing.license_type')}
                            </div>

                            <h3 className="text-2xl font-bold mb-2 text-[var(--text-color)]">{t('pricing.program_name')}</h3>
                            <p className="mb-8 leading-relaxed text-[var(--text-muted)] font-medium">{t('pricing.program_desc')}</p>

                            <div className="mb-10">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="line-through text-2xl font-medium text-gray-500 opacity-50">$29</span>
                                    <span className="text-6xl font-black text-[var(--text-color)]">$9.99</span>
                                </div>
                                <p className="text-indigo-600 font-bold mt-2 text-sm uppercase tracking-wider">{t('pricing.one_time')}</p>
                            </div>

                            <button
                                onClick={handlePayment}
                                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl hover:scale-[1.02] transform active:scale-95 cursor-pointer shadow-indigo-600/20 ${hasLicense
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                    }`}
                            >
                                {hasLicense
                                    ? t('dashboard.menu_dash')
                                    : (user ? t('pricing.cta_buy') : t('pricing.cta_start'))
                                }
                            </button>

                            <div className="mt-8 space-y-3 w-full">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)] font-bold text-left px-4">
                                        <div className="w-5 h-5 rounded-full bg-indigo-600/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-indigo-500" />
                                        </div>
                                        <span>{t(`pricing.benefit_${i}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t px-6 text-center border-[var(--card-border)] bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-black border border-white/10">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold tracking-tight text-[var(--text-color)]">VideoLighter</span>
                        </div>

                        <div className="flex gap-8 text-sm font-medium">
                            <button onClick={() => openLegal('privacy')} className="hover:text-indigo-500 transition-colors cursor-pointer">{t('legal.privacy_title')}</button>
                            <button onClick={() => openLegal('terms')} className="hover:text-indigo-500 transition-colors cursor-pointer">{t('legal.terms_title')}</button>
                            <button onClick={() => openLegal('contact')} className="hover:text-indigo-500 transition-colors cursor-pointer">Contact</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('footer.contact')}</p>
                        <p className="text-xs font-bold">{t('footer.copyright')}</p>
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={isLegalModalOpen}
                onClose={() => setIsLegalModalOpen(false)}
                type={legalModelType}
            />
        </div>
    );
};

export default Home;
