import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SettingsPanel } from './components/SettingsPanel';
import { BottomBar } from './components/BottomBar';
import { LegalModal } from './components/LegalModal';
import { VideoFile, CompressionSettings, Language } from './types';
import { TRANSLATIONS } from './constants';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { compressVideo, getFileInfo } from './lib';
import { ActivationModal } from './components/ActivationModal';
import { supabase } from './supabase';

const App: React.FC = () => {
    const PAID_OFFLINE_GRACE_HOURS = 72;

    // --- State ---
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [language, setLanguage] = useState<Language>('ko');
    const [isActivated, setIsActivated] = useState<boolean>(false);
    const [showActivation, setShowActivation] = useState<boolean>(false);
    const [isLicensingReady, setIsLicensingReady] = useState(false);

    const isWithinOfflineGrace = (lastVerifyAt: string | null) => {
        if (!lastVerifyAt) return false;
        const last = new Date(lastVerifyAt).getTime();
        if (!Number.isFinite(last)) return false;
        const elapsedMs = Date.now() - last;
        return elapsedMs <= PAID_OFFLINE_GRACE_HOURS * 60 * 60 * 1000;
    };

    // Initial Activation Check (re-validate with server if stored key exists)
    useEffect(() => {
        const bootstrap = async () => {
            const storedActivated = localStorage.getItem('VL_ACTIVATED');
            const storedLicenseKey = localStorage.getItem('VL_LICENSE_KEY');
            const lastVerifyAt = localStorage.getItem('VL_LAST_VERIFY_AT');

            if (storedActivated === 'true' && storedLicenseKey) {
                try {
                    const machineId = await invoke<string>('get_machine_id');
                    const { data, error } = await supabase.functions.invoke('verify-license', {
                        body: { licenseKey: storedLicenseKey, deviceId: machineId },
                    });

                    if (!error && data?.success) {
                        setIsActivated(true);
                        localStorage.setItem('VL_LAST_VERIFY_AT', new Date().toISOString());
                        setIsLicensingReady(true);
                        return;
                    }

                    // If server is reachable and says invalid/expired/locked, deny access immediately.
                    if (!error && data?.success === false) {
                        localStorage.removeItem('VL_ACTIVATED');
                        localStorage.removeItem('VL_LICENSE_KEY');
                        localStorage.removeItem('VL_LAST_VERIFY_AT');
                        setIsActivated(false);
                        setTimeout(() => setShowActivation(true), 500);
                        setIsLicensingReady(true);
                        return;
                    }

                    // Connectivity/server issue: allow temporary paid offline grace.
                    if (isWithinOfflineGrace(lastVerifyAt)) {
                        setIsActivated(true);
                        setIsLicensingReady(true);
                        return;
                    }
                } catch (err) {
                    console.error('Silent license re-validation failed:', err);
                    if (isWithinOfflineGrace(lastVerifyAt)) {
                        setIsActivated(true);
                        setIsLicensingReady(true);
                        return;
                    }
                }
            }

            localStorage.removeItem('VL_ACTIVATED');
            localStorage.removeItem('VL_LICENSE_KEY');
            localStorage.removeItem('VL_LAST_VERIFY_AT');
            setIsActivated(false);
            setTimeout(() => setShowActivation(true), 500);
            setIsLicensingReady(true);
        };

        void bootstrap();
    }, []);

    const [files, setFiles] = useState<VideoFile[]>([]);
    const [settings, setSettings] = useState<CompressionSettings>({
        format: 'MP4',
        resolution: 'Original',
        lockAspectRatio: true,
        compressionLevel: 6, // Balanced default
        removeAudio: false,
        moveToTrash: false,
        subjectiveVQ: true, // Always ON (Magic Quality)
        enableHDR: false,
        enableDeshake: false, // Removed feature
        cleanMetadata: false, // Default to OFF (Keep metadata)
        enableTurbo: false,
        parallelLimit: 2,
        enableWatermark: false, // Removed feature
        watermarkText: undefined,
        enableThumbnail: false, // Removed feature
        outputMode: 'Same',
        customOutputPath: undefined,
        useHighEfficiencyCodec: false, // Default to FALSE (VP9 Safe)
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [totalProgress, setTotalProgress] = useState(0);
    const [showLegal, setShowLegal] = useState(false);
    const [freeQuotaState, setFreeQuotaState] = useState<{
        checking: boolean;
        allowed: boolean | null;
        remaining: number | null;
        resetAt: string | null;
        reason: string | null;
    }>({
        checking: false,
        allowed: null,
        remaining: null,
        resetAt: null,
        reason: null,
    });

    const stopFnsRef = useRef<Map<string, () => void>>(new Map());
    const activeIdsRef = useRef<Set<string>>(new Set());

    // --- Theme Effect ---
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // --- Handlers ---
    const addFiles = useCallback(async (paths: string[]) => {
        if (isProcessing) return;
        const newFilesPromises = paths.map(async (path) => {
            const name = path.split(/[\\/]/).pop() || 'Unknown';
            const info = await getFileInfo(path);
            return {
                id: crypto.randomUUID(),
                path: path,
                name: name,
                status: 'queued',
                originalSize: info.size,
                progress: 0
            } as VideoFile;
        });
        const newFiles = await Promise.all(newFilesPromises);
        setFiles(prev => [...prev, ...newFiles]);
    }, [isProcessing]);

    // Native Drag and Drop Listener for Tauri v2
    useEffect(() => {
        const unlistenPromise = getCurrentWebviewWindow().onDragDropEvent((event) => {
            if (event.payload.type === 'drop') {
                const paths = event.payload.paths;
                addFiles(paths);
            }
        });

        return () => {
            unlistenPromise.then(unlisten => unlisten());
        };
    }, [addFiles]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleBrowse = useCallback(async () => {
        if (isProcessing) return;
        try {
            const selected = await open({
                multiple: true,
                filters: [{
                    name: 'Video',
                    extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm']
                }]
            });
            if (selected) {
                const paths = Array.isArray(selected) ? selected : (selected === null ? [] : [selected]);
                addFiles(paths);
            }
        } catch (err) {
            console.error('Failed to open file dialog:', err);
        }
    }, [isProcessing, addFiles]);

    const handleRemove = useCallback((id: string) => {
        if (isProcessing) return;
        setFiles(prev => prev.filter(f => f.id !== id));
    }, [isProcessing]);

    const handleClearAll = useCallback(() => {
        if (isProcessing) return;
        setFiles([]);
    }, [isProcessing]);

    const updateSettings = useCallback((partial: Partial<CompressionSettings>) => {
        setSettings(prev => ({ ...prev, ...partial }));
    }, []);

    const handleOpenFolder = useCallback((path: string) => {
        invoke('show_in_folder', { path });
    }, []);

    // --- Processing Logic ---
    const processFile = async (file: VideoFile) => {
        activeIdsRef.current.add(file.id);
        const nextId = Array.from(activeIdsRef.current)[0] || null;
        setCurrentFileId(nextId);

        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'processing', progress: 0 } : f));

        try {
            const path = file.path;
            const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
            const dir = path.substring(0, lastSlash);
            const filenameWithExt = path.substring(lastSlash + 1);
            const lastDot = filenameWithExt.lastIndexOf('.');
            const filename = lastDot !== -1 ? filenameWithExt.substring(0, lastDot) : filenameWithExt;

            const ext = settings.format.toLowerCase();
            const resolutionSuffix = settings.resolution === 'Original' ? '' : `_${settings.resolution}`;

            let outDir = dir;
            if (settings.outputMode === 'Custom' && settings.customOutputPath) {
                outDir = settings.customOutputPath;
            }

            const outputPath = `${outDir}\\${filename}_compressed${resolutionSuffix}.${ext}`;

            const { promise, stop } = compressVideo(
                file.path,
                outputPath,
                settings,
                (progress) => {
                    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: progress.percent } : f));
                }
            );

            stopFnsRef.current.set(file.id, stop);
            await promise;

            const outputInfo = await getFileInfo(outputPath);

            if (settings.moveToTrash) {
                try {
                    await invoke('move_to_trash', { path: file.path });
                } catch (e) {
                    console.error('Failed to move original file to trash:', e);
                }
            }

            setFiles(prev => prev.map(f => f.id === file.id ? {
                ...f,
                status: 'completed',
                progress: 100,
                compressedSize: outputInfo.size,
                outputPath: outputPath
            } : f));
        } catch (error: any) {
            if (error.message === 'STOPPED') {
                setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'queued', progress: 0 } : f));
            } else {
                console.error(`Error processing file ${file.name}: `, error);
                setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'error', progress: 0 } : f));
            }
        } finally {
            activeIdsRef.current.delete(file.id);
            stopFnsRef.current.delete(file.id);
            const nextId = Array.from(activeIdsRef.current)[0] || null;
            setCurrentFileId(nextId);

            // Check if all done
            setFiles(currentFiles => {
                const total = currentFiles.length;
                const done = currentFiles.filter(f => f.status === 'completed' || f.status === 'error').length;
                setTotalProgress(total > 0 ? (done / total) * 100 : 0);

                if (done === total && isProcessing) {
                    setIsProcessing(false);
                }
                return currentFiles;
            });
        }
    };

    // Auto-spawn tasks
    useEffect(() => {
        if (!isProcessing) return;

        const queued = files.filter(f => f.status === 'queued' && !activeIdsRef.current.has(f.id));
        const activeCount = activeIdsRef.current.size;
        const canSpawn = settings.parallelLimit - activeCount;

        if (canSpawn > 0 && queued.length > 0) {
            queued.slice(0, canSpawn).forEach(file => {
                processFile(file);
            });
        }

        if (activeCount === 0 && queued.length === 0) {
            setIsProcessing(false);
        }
    }, [isProcessing, files, settings.parallelLimit]);

    const getRequestedFiles = useCallback(() => {
        const queuedCount = files.filter(f => f.status === 'queued').length;
        const allDone = files.length > 0 && files.every(f => f.status === 'completed');
        return queuedCount > 0 ? queuedCount : (allDone ? files.length : 0);
    }, [files]);

    useEffect(() => {
        const checkFreeQuota = async () => {
            if (isActivated || isProcessing) return;
            const requestedFiles = getRequestedFiles();
            if (requestedFiles <= 0) {
                setFreeQuotaState({
                    checking: false,
                    allowed: null,
                    remaining: null,
                    resetAt: null,
                    reason: null,
                });
                return;
            }

            setFreeQuotaState(prev => ({ ...prev, checking: true }));
            try {
                const machineId = await invoke<string>('get_machine_id');
                const { data, error } = await supabase.functions.invoke('check-free-quota', {
                    body: { deviceId: machineId, requestedFiles, commit: false }
                });

                if (error) {
                    setFreeQuotaState({
                        checking: false,
                        allowed: false,
                        remaining: null,
                        resetAt: null,
                        reason: 'OFFLINE_OR_SERVER',
                    });
                    return;
                }

                setFreeQuotaState({
                    checking: false,
                    allowed: Boolean(data?.allowed),
                    remaining: typeof data?.remaining === 'number' ? data.remaining : null,
                    resetAt: data?.resetAt ?? null,
                    reason: data?.reason ?? null,
                });
            } catch {
                setFreeQuotaState({
                    checking: false,
                    allowed: false,
                    remaining: null,
                    resetAt: null,
                    reason: 'OFFLINE_OR_SERVER',
                });
            }
        };

        void checkFreeQuota();
    }, [isActivated, isProcessing, getRequestedFiles]);

    const startCompression = useCallback(async () => {
        if (!isActivated) {
            const requestedFiles = getRequestedFiles();
            if (requestedFiles <= 0) {
                return;
            }
            if (freeQuotaState.checking) {
                return;
            }

            try {
                const machineId = await invoke<string>('get_machine_id');
                const { data, error } = await supabase.functions.invoke('check-free-quota', {
                    body: { deviceId: machineId, requestedFiles, commit: true }
                });

                if (error || !data?.allowed) {
                    setFreeQuotaState({
                        checking: false,
                        allowed: false,
                        remaining: typeof data?.remaining === 'number' ? data.remaining : null,
                        resetAt: data?.resetAt ?? null,
                        reason: data?.reason ?? 'OFFLINE_OR_SERVER',
                    });
                    return;
                }

                setFreeQuotaState({
                    checking: false,
                    allowed: true,
                    remaining: typeof data?.remaining === 'number' ? data.remaining : null,
                    resetAt: data?.resetAt ?? null,
                    reason: null,
                });
            } catch {
                setFreeQuotaState({
                    checking: false,
                    allowed: false,
                    remaining: null,
                    resetAt: null,
                    reason: 'OFFLINE_OR_SERVER',
                });
                return;
            }
        }

        if (isProcessing) {
            // Stop everything
            stopFnsRef.current.forEach(stop => stop());
            stopFnsRef.current.clear();
            activeIdsRef.current.clear();
            setIsProcessing(false);
            return;
        }

        const hasQueued = files.some(f => f.status === 'queued');
        const allDone = files.length > 0 && files.every(f => f.status === 'completed');

        if (!hasQueued && allDone) {
            setFiles(prev => prev.map(f => ({ ...f, status: 'queued', progress: 0 })));
        }

        setIsProcessing(true);
        setTotalProgress(0);
    }, [files, isProcessing, isActivated, getRequestedFiles, freeQuotaState.checking]);

    const startDisabled = isProcessing
        ? false
        : !isActivated && (
            freeQuotaState.checking ||
            freeQuotaState.allowed === false
        );

    const freeStatusMessage = (() => {
        if (isActivated) return null;
        if (freeQuotaState.checking) {
            return language === 'ko'
                ? '\uBB34\uB8CC \uD50C\uB79C \uC0AC\uC6A9 \uAC00\uB2A5 \uC5EC\uBD80\uB97C \uD655\uC778 \uC911\uC785\uB2C8\uB2E4...'
                : 'Checking free-plan availability...';
        }
        if (freeQuotaState.allowed === false) {
            if (freeQuotaState.reason === 'FREE_LIMIT_REACHED') {
                const resetText = freeQuotaState.resetAt ? new Date(freeQuotaState.resetAt).toLocaleString() : '-';
                return language === 'ko'
                    ? `\uBB34\uB8CC \uD50C\uB79C \uD55C\uB3C4(\uD558\uB8E8 3\uAC1C)\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uCD08\uAE30\uD654: ${resetText}`
                    : `Free-plan limit reached (3/day). Next reset: ${resetText}`;
            }
            return language === 'ko'
                ? '\uBB34\uB8CC \uD50C\uB79C\uC740 \uC628\uB77C\uC778 \uC5F0\uACB0\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.'
                : 'Free mode requires an online connection.';
        }
        if (freeQuotaState.allowed === true) {
            const remain = freeQuotaState.remaining ?? 0;
            return language === 'ko'
                ? `\uBB34\uB8CC \uD50C\uB79C \uC624\uB298 \uB0A8\uC740 \uD69F\uC218: ${remain}`
                : `Free mode remaining today: ${remain}`;
        }
        return null;
    })();

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 overflow-hidden">
            <Header
                theme={theme}
                setTheme={setTheme}
                language={language}
                setLanguage={setLanguage}
                onOpenActivation={() => setShowActivation(true)}
            />
            <main className="flex-1 flex overflow-hidden">
                <div className="w-full lg:w-3/5 border-r border-gray-200 dark:border-slate-800 h-full flex flex-col">
                    <Sidebar
                        files={files}
                        onDrop={handleDrop}
                        onBrowse={handleBrowse}
                        onRemove={handleRemove}
                        onClearAll={handleClearAll}
                        onOpenFolder={handleOpenFolder}
                        t={TRANSLATIONS[language]}
                        freePlanMessage={freeStatusMessage}
                    />
                </div>
                <div className="hidden lg:flex lg:w-2/5 h-full flex-col">
                    <SettingsPanel
                        settings={settings}
                        updateSettings={updateSettings}
                        t={TRANSLATIONS[language]}
                        isProcessing={isProcessing}
                        filesCount={files.length}
                        totalSize={files.reduce((acc, f) => acc + f.originalSize, 0)}
                        onOpenLegal={() => setShowLegal(true)}
                    />
                </div>
            </main>
            <BottomBar
                onStart={startCompression}
                isProcessing={isProcessing}
                totalProgress={totalProgress}
                currentFileId={currentFileId}
                files={files}
                t={TRANSLATIONS[language]}
                startDisabled={startDisabled}
                statusMessage={null}
            />

            <LegalModal
                isOpen={showLegal}
                onClose={() => setShowLegal(false)}
                t={TRANSLATIONS[language]}
                language={language}
            />

            <ActivationModal
                isOpen={showActivation}
                onClose={() => setShowActivation(false)}
                onActivated={(licenseKey) => {
                    setIsActivated(true);
                    localStorage.setItem('VL_ACTIVATED', 'true');
                    localStorage.setItem('VL_LICENSE_KEY', licenseKey);
                    localStorage.setItem('VL_LAST_VERIFY_AT', new Date().toISOString());
                }}
                t={TRANSLATIONS[language]}
                isDark={theme === 'dark'}
                currentLanguage={language}
                onLanguageChange={(lang) => setLanguage(lang)}
            />
        </div>
    );
};

export default App;
