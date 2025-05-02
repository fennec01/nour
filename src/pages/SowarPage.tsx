import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { TapButton } from "@/components/TapButton";
import { dataPro } from "@/data/data";

export function SowarPage() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();

  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null); // Don't allow double prompts
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <TapButton variant="outline" size="sm">🔃</TapButton>
        <h1 className="text-2xl font-bold">السور</h1>
        <div className="flex gap-2">
          {deferredPrompt && (
            <TapButton variant="outline" size="sm" onClick={handleInstallClick}>
              📲 تحميل
            </TapButton>
          )}
          <TapButton variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
            {isDark ? '☀️' : '🌙'}
          </TapButton>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
  {dataPro.map((surah) => (
    <TapButton
      key={surah.id}
      className="m-4 w-64 text-xl py-4"
      onClick={() => navigate(`/${surah.id}`)}
    >
      {surah.id} - {surah.name}
    </TapButton>
  ))}
</div>
    </div>
  );
}
