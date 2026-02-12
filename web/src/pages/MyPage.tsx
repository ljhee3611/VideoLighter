import { useEffect, useState } from 'react';
import { LayoutDashboard, History, LogOut, Copy, Download, HelpCircle, AlertTriangle, Key, Sun, Moon, Menu, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import LegalModal from '../components/LegalModal';
import SEO from '../components/SEO';

interface License {
    id: string;
    license_key: string;
    status: string;
    created_at: string;
    product_type: string;
    product_name?: string;
}

const MyPage = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [licenses, setLicenses] = useState<License[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'dash' | 'history'>('dash');
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
    const [legalModelType, setLegalModalType] = useState<'privacy' | 'terms' | 'contact'>('contact');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const logoSrc = theme === 'dark' ? '/VideoLighter_logo_white.svg' : '/VideoLighter_logo_black.svg';

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            fetchLicenses();
        }
    }, [user]);

    const fetchLicenses = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('licenses')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching licenses:', error.message);
                return;
            }

            setLicenses(data || []);
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key);
        alert(t('dashboard.copy') + '!');
    };

    const openContact = () => {
        setLegalModalType('contact');
        setIsLegalModalOpen(true);
    };

    const handlePayment = () => {
        const checkoutUrl = import.meta.env.VITE_POLAR_CHECKOUT_URL;
        if (!checkoutUrl) {
            alert('Payment link is not configured. Please check VITE_POLAR_CHECKOUT_URL in .env');
            return;
        }
        const finalUrl = `${checkoutUrl}?customer_email=${encodeURIComponent(user?.email || '')}`;
        window.location.href = finalUrl;
    };

    const handleDownload = () => {
        alert('Windows Installer Download Starting...');
    };

    return (
        <div className="min-h-screen bg-transparent text-[var(--text-color)] font-sans flex overflow-hidden relative">
            <SEO title={`${t('dashboard.menu_dash')} | VideoLighter`} />
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden fixed top-6 left-6 z-[60] p-2 bg-indigo-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-indigo-500 transition-all active:scale-95"
                >
                    <Menu className="w-5 h-5" />
                </button>
            )}

            <aside className={`
                w-64 fixed h-full z-[80] border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] transition-all duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'left-0 shadow-2xl' : '-left-64 md:left-0 shadow-none'}
            `}>
                <div className="p-6">
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <img src={logoSrc} alt="Logo" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold tracking-tight text-lg text-[var(--text-color)]">VideoLighter</span>
                    </Link>
                </div>

                <nav className="px-4 space-y-2 flex-1">
                    <button
                        onClick={() => { setActiveTab('dash'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${activeTab === 'dash' ? 'bg-indigo-600 text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        {t('dashboard.menu_dash')}
                    </button>
                    <button
                        onClick={() => { setActiveTab('history'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                        <History className="w-5 h-5" />
                        {t('dashboard.menu_history')}
                    </button>
                </nav>

                <div className="p-4 border-t border-[var(--card-border)]">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/5 transition-all cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        {t('nav.logout')}
                    </button>
                </div>
            </aside>

            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-[65] md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            )}

            <main className="flex-1 md:ml-64 overflow-y-auto min-h-screen">
                <header className="p-6 md:p-12 mb-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="pt-14 md:pt-0"
                        >
                            <h1 className="text-3xl md:text-4xl font-black mb-2">{t('dashboard.title')}</h1>
                            <p className="text-[var(--text-muted)] font-medium">{user?.email}</p>
                        </motion.div>
                        <div className="flex items-center gap-3">
                            <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-[var(--card-border)] text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--text-color)] transition-all cursor-pointer">
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <div className="flex border rounded-xl overflow-hidden p-1 bg-black/5 dark:bg-white/5 border-[var(--card-border)]">
                                <button onClick={() => changeLanguage('ko')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${i18n.language === 'ko' ? 'bg-indigo-600 text-white' : 'text-[var(--text-muted)]'}`}>KR</button>
                                <button onClick={() => changeLanguage('en')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${i18n.language === 'en' ? 'bg-indigo-600 text-white' : 'text-[var(--text-muted)]'}`}>EN</button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-12 pt-0 max-w-6xl mx-auto space-y-12">
                    {activeTab === 'dash' ? (
                        <div className="space-y-12">
                            {/* Purchaser Primary Actions Row */}
                            {licenses.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="p-8 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm group hover:border-indigo-500/30 transition-all">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 text-indigo-600"><Download className="w-7 h-7" /></div>
                                        <h4 className="text-xl font-bold mb-3">{t('hero.download')}</h4>
                                        <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">{t('dashboard.download_desc')}</p>
                                        <button onClick={handleDownload} className="w-full py-4.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-xl shadow-indigo-600/20 mb-4 tracking-tight">
                                            {t('hero.download')}
                                        </button>
                                        <p className="text-[10px] text-center font-bold text-[var(--text-muted)] uppercase tracking-widest">{t('hero.macos_waiting')}</p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm group hover:border-indigo-500/30 transition-all">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 text-indigo-600"><ExternalLink className="w-7 h-7" /></div>
                                        <h4 className="text-xl font-bold mb-3">{t('dashboard.billing')}</h4>
                                        <p className="text-[var(--text-muted)] text-sm mb-10 leading-relaxed">{t('dashboard.billing_desc')}</p>
                                        <a
                                            href="https://polar.sh/purchases"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4.5 text-center border border-[var(--card-border)] rounded-2xl font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer block transition-all mb-4"
                                        >
                                            {t('dashboard.billing')}
                                        </a>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-sm group hover:border-indigo-500/30 transition-all">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 text-indigo-600"><HelpCircle className="w-7 h-7" /></div>
                                        <h4 className="text-xl font-bold mb-3">{t('dashboard.support')}</h4>
                                        <p className="text-[var(--text-muted)] text-sm mb-10 leading-relaxed">{t('dashboard.support_desc')}</p>
                                        <button onClick={openContact} className="w-full py-4.5 border border-[var(--card-border)] rounded-2xl font-bold hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-all mb-4">{t('dashboard.contact_support')}</button>
                                    </div>
                                </div>
                            )}

                            {loading ? (
                                <div className="glass border-[var(--card-border)] rounded-[2.5rem] p-20 flex items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : licenses.length > 0 ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass border-[var(--card-border)] bg-[var(--card-bg)] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-sm">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 blur-[100px] -mr-40 -mt-40"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                                                    <Key className="w-6 h-6" />
                                                </div>
                                                <span className="font-black uppercase tracking-widest text-[11px] text-indigo-600">{t('dashboard.license_status')}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5 bg-emerald-500/10 text-emerald-600 px-5 py-2 rounded-full border border-emerald-500/20 text-xs font-black">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                {t('dashboard.active')}
                                            </div>
                                        </div>
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-black mb-4">{t('dashboard.active_license')}</h3>
                                                <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-3xl">{t('dashboard.license_desc')}</p>
                                            </div>
                                            <div className="p-6 md:p-8 bg-black/5 dark:bg-black/40 border border-[var(--card-border)] rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                                                <code className="text-indigo-600 font-mono text-xl md:text-3xl tracking-widest select-all">{licenses[0].license_key}</code>
                                                <button onClick={() => handleCopy(licenses[0].license_key)} className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-95">
                                                    <Copy className="w-5 h-5" />
                                                    {t('dashboard.copy')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass border-[var(--card-border)] bg-[var(--card-bg)] rounded-[2.5rem] p-12 md:p-20 text-center shadow-sm">
                                    <h3 className="text-2xl font-black mb-4">{t('dashboard.no_license')}</h3>
                                    <p className="text-[var(--text-muted)] mb-10 text-lg leading-relaxed max-w-lg mx-auto">{t('dashboard.buy_product_desc')}</p>
                                    <button
                                        onClick={handlePayment}
                                        className="inline-block px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-500 transition-all cursor-pointer shadow-2xl shadow-indigo-600/30 active:scale-95"
                                    >
                                        {t('dashboard.buy_product')}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass border-[var(--card-border)] bg-[var(--card-bg)] rounded-[2rem] p-8 md:p-12 shadow-sm">
                            <h3 className="text-2xl font-bold mb-8">{t('dashboard.menu_history')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[var(--card-border)] text-[var(--text-muted)] text-sm uppercase tracking-widest">
                                            <th className="pb-4 font-black">{t('history.product', 'Product')}</th>
                                            <th className="pb-4 font-black">{t('history.date', 'Date')}</th>
                                            <th className="pb-4 font-black">{t('history.status', 'Status')}</th>
                                            <th className="pb-4 font-black text-right">{t('history.price', 'Price')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--card-border)]">
                                        {licenses.length > 0 ? (
                                            licenses.map((item) => (
                                                <tr key={item.id} className="group">
                                                    <td className="py-6 min-w-[200px]">
                                                        <div className="font-bold text-lg">{item.product_name || item.product_type || 'VideoLighter License'}</div>
                                                        <div className="text-xs text-[var(--text-muted)] font-mono mt-1 tracking-wider opacity-60">{item.license_key}</div>
                                                    </td>
                                                    <td className="py-6 text-sm text-[var(--text-muted)]">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-6">
                                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase">{item.status}</span>
                                                    </td>
                                                    <td className="py-6 text-right font-black">$9.99</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-[var(--text-muted)]">{t('dashboard.no_license')}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 flex justify-start">
                                <button onClick={openContact} className="text-[var(--text-muted)] hover:text-red-500 transition-colors flex items-center gap-2 cursor-pointer text-sm font-semibold">
                                    <AlertTriangle className="w-4 h-4" />
                                    {t('dashboard.refund')}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    <div className="pt-8 border-t border-[var(--card-border)] flex justify-end items-center text-[var(--text-muted)] text-xs font-semibold">
                        <span>VideoLighter v1.0.0</span>
                    </div>
                </div>
            </main>

            <LegalModal
                isOpen={isLegalModalOpen}
                onClose={() => setIsLegalModalOpen(false)}
                type={legalModelType}
            />
        </div>
    );
};

export default MyPage;
