import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { HStack } from '@astryxdesign/core/HStack';
import { Selector } from '@astryxdesign/core/Selector';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { MovieSearchBox } from './MovieSearchBox';

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'tv', label: 'TV Shows' },
] as const;

export function AppTopBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const category = searchParams.get('category') ?? 'all';
  const query = searchParams.get('q') ?? '';
  const isMovieList = location.pathname === '/movies';

  function handleCategoryChange(value: string) {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all') next.delete('category');
    else next.set('category', value);
    next.delete('page');
    const search = next.toString();
    if (location.pathname !== '/') {
      navigate({ pathname: '/', search });
      return;
    }
    setSearchParams(next);
  }

  return (
    <TopNav
      label="Main navigation"
      heading={<TopNavHeading heading="CineShelf" headingHref="/" />}
      startContent={
        <TopNavItem label="Movie" href="/movies" isSelected={isMovieList} />
      }
      endContent={
        <HStack gap={2} vAlign="center">
          <MovieSearchBox initialQuery={query} />
          <Selector
            label="Category"
            isLabelHidden
            variant="ghost"
            size="sm"
            options={[...CATEGORY_OPTIONS]}
            value={category}
            onChange={handleCategoryChange}
            placeholder="Category"
            width={150}
          />
        </HStack>
      }
    />
  );
}
