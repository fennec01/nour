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

  const songs = ['song1.mp3', 'song2.mp3'];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          ← Back
        </Button>
        <h2 className="text-xl font-semibold">{albumId}</h2>
        <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </Button>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {songs.map((song) => (
          <Button key={song} className="m-2 w-48" onClick={() => setCurrentSong(`/songs/${song}`)}>
            {song.replace('.mp3', '')}
          </Button>
        ))}
        {currentSong && <AudioPlayer src={currentSong} />}
      </div>
    </div>
  );
}
