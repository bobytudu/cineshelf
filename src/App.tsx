import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { MovieListPage } from './pages/MovieListPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MovieListPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}
