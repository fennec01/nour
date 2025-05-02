import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useTheme } from "@/hooks/useTheme";
import { TapButton } from "@/components/TapButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { dataPro } from "@/data/data";

export function SurahPage() {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const surah = surahId ? dataPro.find(item => item.id === parseInt(surahId, 10)) : null;
  const [currentSurahPart, setCurrentSurahPart] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<string>(
  surah?.reciters?.[0] || ""
);

  const reciterNames: { [key: string]: string } = {
    hamza: "حمزة",
    yacin: "ياسين",
    humaid: "حميد"
  };



  useEffect(() => {
    if (surah?.reciters?.length) {
      setSelectedReciter(surah.reciters[0]); // auto-select first reciter
    }
  }, [surah]);

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <TapButton variant="outline" size="sm" onClick={() => navigate("/")}>
          ← رجوع
        </TapButton>
        <h2 className="text-xl font-semibold">{surah?.name} - {surahId}</h2>
        <TapButton variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️' : '🌙'}
        </TapButton>
      </nav>

      {/* Select Component */}
      {surah?.reciters && (
  <div className="p-4 flex justify-center">
    <Select value={selectedReciter} onValueChange={setSelectedReciter}> {/* optional state handler */}
      <SelectTrigger className="w-[180px] justify-center text-center text-xl">
        <SelectValue placeholder="القارئ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {surah.reciters.map((reciter) => (
            <SelectItem key={reciter} value={reciter} className="text-xl">
             {reciterNames[reciter] || reciter}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)}
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
      {surah?.parts && Array.from({ length: surah.parts }, (_, index) => {
        const part = index + 1;
        return (
          <TapButton
            key={part}
            className="m-4 w-64 text-xl py-4"
            onClick={() =>
              setCurrentSurahPart(
                `https://cdn.jsdelivr.net/gh/test/tset@gh-pages/sowar/${surahId}/${selectedReciter}/${part}.mp3`
              )
            }
          >
            {'الجزء ' + part}
          </TapButton>
        );
      })}
      </div>

      {/* Sticky AudioPlayer */}
      {currentSurahPart && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <AudioPlayer src={currentSurahPart} />
        </div>
      )}
    </div>
  );
}
