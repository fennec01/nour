import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useTheme } from "@/hooks/useTheme";

export function SongsPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const songs = ['najm1.mp3', 'najm2.mp3', 'najm3.mp3'];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          ← رجوع
        </Button>
        <h2 className="text-xl font-semibold">{albumId}</h2>
        <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </Button>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {songs.map((song, index) => (
          <Button key={song} className="m-4 w-64 text-xl py-4" onClick={() => setCurrentSong(`https://cdn.jsdelivr.net/gh/fennec01/nour/public/songs/${song}`)}>
            {'الجزء ' + (index + 1)}
          </Button>
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
