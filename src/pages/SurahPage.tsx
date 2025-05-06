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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Expand, Moon, Sun } from "lucide-react"; // icon lib used by chadcn

export function SurahPage() {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useTheme();
  const surah = surahId ? dataPro.find(item => item.id === parseInt(surahId, 10)) : null;
  const [surahUrl, setSurahUrl] = useState<string | null>(null);
  const [surahPart, setSurahPart] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<string>(
  surah?.reciters?.[0] || ""
);

  const reciterNames: { [key: string]: string } = {
    hamza: "حمزة (ورش)",
    yacin: " ياسين (ورش)",
    humaid: "حميد (حفص)",
    afasi: "العفاسي (حفص)"
  };

  const reciterQuran:{ [key: string]: string } = {
    hamza: 'warsh',
    yacin: 'warsh',
    humaid: 'hafs',
    afasi: 'hafs'
  }



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
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{surah?.name}    
          </h2>   
          <Badge variant="outline" className="rounded-full px-1 text-xs">
            {surah?.id}
          </Badge>
        </div>
        <TapButton variant="outline" size="sm" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun /> : <Moon />}
        </TapButton>
        
      </nav>

      {/* Select Component */}
      {surah?.reciters && (
  <div className="p-4 flex justify-center">
    <Select
      value={selectedReciter}
      onValueChange={(newReciter) => {
        setSelectedReciter(newReciter);
        if(surahPart){
          setSurahUrl(
              `https://cdn.jsdelivr.net/gh/fennec01/nour@gh-pages/sowar/${surahId}/${newReciter}/${surahPart}.mp3`   
          );
        }
        
      }}
    >
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
<div className="flex flex-col justify-center items-center flex-1 p-6 -translate-y-9">
  {surah?.parts &&
    Array.from({ length: surah.parts }, (_, index) => {
      const part = index + 1;
      return (
        <div key={part} className="flex gap-2 m-4">
          {/* Additional TapButton with dialog */}
          {surah?.imagesStartIndex && (
            <Dialog>
              <DialogTrigger asChild>
            <TapButton variant="secondary" className="px-4 py-4">
            <Expand className="h-4 w-4" />
            </TapButton>
              </DialogTrigger>
                <DialogContent className="flex items-center justify-center gap-0">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <img
                src={
                  reciterQuran[selectedReciter] === 'warsh'
                  ? `https://cdn.jsdelivr.net/gh/fennec01/nour@gh-pages/img/warsh/${surahId}/${part}.png`
                  : `https://ik.imagekit.io/hefz/quran/${surah?.imagesStartIndex + index}.webp`
                }
                alt={`Preview for part ${part}`}
                className={`max-w-full h-auto ${isDark ? 'invert' : ''}`}
                />
                </DialogContent>
            </Dialog>
          )}

          {/* Existing TapButton */}
          <TapButton
            className="w-64 text-xl py-4"
            onClick={() => {
              setSurahPart(part.toString());
              setSurahUrl(
          `https://cdn.jsdelivr.net/gh/fennec01/nour@gh-pages/sowar/${surahId}/${selectedReciter}/${part}.mp3`
              );
            }}
          >
            {'الجزء ' + part}
          </TapButton>
        </div>
      );
    })}
</div>

      {/* Sticky AudioPlayer */}
      {surahUrl && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-800 shadow-md p-4">
          <AudioPlayer src={surahUrl} />
        </div>
      )}
    </div>
  );
}
