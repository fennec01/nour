import { useEffect, useRef } from "react";

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // Pause any previous audio
    audio.pause();
    
    // Change source
    audio.src = src;
    
    // Load new song
    audio.load();
    
    // Try to play safely
    audio.play().catch((error) => {
      console.warn("Audio play failed:", error);
    });
  }, [src]);

  return (
    <audio ref={audioRef} loop controls className="mt-4 w-full" />
  );
}
