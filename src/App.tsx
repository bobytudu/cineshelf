import { Routes, Route } from 'react-router-dom';
import { DmcaPage } from './pages/DmcaPage';
import { HomePage } from './pages/HomePage';
import { InfoPage } from './pages/InfoPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { MovieListPage } from './pages/MovieListPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

const INFO_PATHS = ['about', 'blog', 'faq'] as const;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MovieListPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/dmca" element={<DmcaPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      {INFO_PATHS.map((slug) => (
        <Route key={slug} path={`/${slug}`} element={<InfoPage />} />
      ))}
    </Routes>
  );
}
