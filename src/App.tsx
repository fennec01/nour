import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlbumPage } from './pages/AlbumPage';
import { SongsPage } from './pages/SongsPage';

function App() {
  return (
    <BrowserRouter   basename={import.meta.env.DEV ? "/" : "/nour"}>
      <Routes>
        <Route path="/" element={<AlbumPage />} />
        <Route path="/album/:albumId" element={<SongsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
