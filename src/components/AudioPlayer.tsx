import { useEffect, useRef } from "react";

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [src]);

  return (
    <audio ref={audioRef} loop controls className="mt-4 w-full" />
  );
}
