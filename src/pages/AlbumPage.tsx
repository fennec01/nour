import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AlbumPage() {
  const navigate = useNavigate();
  const albums = ['Chill Vibes', 'Workout Hits'];

  return (
    <div className="p-6">
      {albums.map((album) => (
        <Button key={album} className="m-2" onClick={() => navigate(`/album/${album}`)}>
          {album}
        </Button>
      ))}
    </div>
  );
}
