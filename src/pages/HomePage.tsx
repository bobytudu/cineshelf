import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@astryxdesign/core/Button';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { fetchMovies, type Movie, type MoviesPager } from '../api/movies';
import { searchMovies } from '../api/search';
import { parsePageParam } from '../lib/pageParam';
import { MovieCard } from '../components/MovieCard';
import { PageShell } from '../components/PageShell';
import { Pagination } from '../components/Pagination';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePageParam(searchParams.get('page'));
  const category = searchParams.get('category') ?? 'all';
  const query = (searchParams.get('q') ?? '').trim();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [pager, setPager] = useState<MoviesPager | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    const request = query
      ? searchMovies({ query, page })
      : fetchMovies({ page, type: category });

    request
      .then((data) => {
        if (cancelled) return;
        setMovies(data.results);
        setPager(data.pager);
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      });

    return () => {
      cancelled = true;
    };
  }, [page, category, query, reloadKey]);

  const visibleMovies = useMemo(() => {
    if (!query || category === 'all') return movies;
    return movies.filter((movie) => movie.media_type === category);
  }, [movies, query, category]);

  function goToPage(next: number) {
    const params = new URLSearchParams(searchParams);
    if (next <= 0) params.delete('page');
    else params.set('page', String(next));
    setSearchParams(params);
  }

  return (
    <PageShell>
      <VStack
        gap={4}
        maxWidth={1152}
        width="100%"
        hAlign="center"
        className="mx-auto"
      >
        <div className='p-5 bg-red-500'></div>
        <Heading level={1} type="display-2" justify="center" className='pt-3'>
          {query ? `Results for “${query}”` : 'Movies'}
        </Heading>

        {status === 'loading' ? (
          <Text color="secondary" justify="center">
            Loading movies…
          </Text>
        ) : null}

        {status === 'error' ? (
          <VStack gap={3} hAlign="center">
            <Text color="accent" justify="center">
              {error}
            </Text>
            <Button
              label="Retry"
              onClick={() => setReloadKey((k) => k + 1)}
            />
          </VStack>
        ) : null}

        {status === 'ready' ? (
          <VStack gap={2} width="100%">
            {visibleMovies.length === 0 ? (
              <Text color="secondary" justify="center">
                No movies match your search.
              </Text>
            ) : (
              <Grid columns={{ minWidth: 280, max: 3 }} gap={4} width="100%">
                {visibleMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </Grid>
            )}
            {pager && !(query && category !== 'all') ? (
              <Pagination
                currentPage={pager.current_page}
                totalPages={pager.total_pages}
                onPageChange={goToPage}
              />
            ) : null}
          </VStack>
        ) : null}
      </VStack>
    </PageShell>
  );
}
