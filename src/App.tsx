import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SowarPage } from './pages/SowarPage';
import { SurahPage } from './pages/SurahPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/nour"}>
      <Routes>
        <Route path="/" element={<SowarPage />} />
        <Route path="/:surahId" element={<SurahPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
