import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useTheme } from "@/hooks/useTheme";
import { TapButton } from "@/components/TapButton";

export function SongsPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const songs = ['alnajm1.mp3', 'alnajm2.mp3', 'alnajm3.mp3'];

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <TapButton variant="outline" size="sm" onClick={() => navigate("/")}>
          ← رجوع
        </TapButton>
        <h2 className="text-xl font-semibold">{albumId}</h2>
        <TapButton variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </TapButton>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {songs.map((song, index) => (
          <TapButton key={song} className="m-4 w-64 text-xl py-4" onClick={() => setCurrentSong(`https://cdn.jsdelivr.net/gh/fennec01/nour@gh-pages/songs/${song}`)}>
            {'الجزء ' + (index + 1)}
          </TapButton>
        ))}
      </div>

      {/* Sticky AudioPlayer */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <AudioPlayer src={currentSong} />
        </div>
      )}
    </div>
  );
}
