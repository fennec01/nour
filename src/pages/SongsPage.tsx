import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";

export function SongsPage() {
  const { albumId } = useParams();
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const songs = ['song1.mp3', 'song2.mp3'];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">{albumId}</h2>
      {songs.map((song) => (
        <Button key={song} className="m-2" onClick={() => setCurrentSong(`/songs/${song}`)}>
          {song.replace('.mp3', '')}
        </Button>
      ))}
      {currentSong && <AudioPlayer src={currentSong} />}
    </div>
  );
}
