import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Button } from '@astryxdesign/core/Button';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { fetchMovies, type Movie, type MoviesPager } from '../api/movies';
import { parsePageParam } from '../lib/pageParam';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePageParam(searchParams.get('page'));

  const [movies, setMovies] = useState<Movie[]>([]);
  const [pager, setPager] = useState<MoviesPager | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetchMovies({ page })
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
  }, [page, reloadKey]);

  function goToPage(next: number) {
    setSearchParams(next <= 0 ? {} : { page: String(next) });
  }

  return (
    <AppShell height="auto" contentPadding={4}>
      <VStack gap={4} maxWidth={1152} width="100%">
        <Heading level={1}>Movies</Heading>

        {status === 'loading' ? (
          <Text color="secondary">Loading movies…</Text>
        ) : null}

        {status === 'error' ? (
          <VStack gap={3}>
            <Text color="accent">{error}</Text>
            <Button
              label="Retry"
              onClick={() => setReloadKey((k) => k + 1)}
            />
          </VStack>
        ) : null}

        {status === 'ready' ? (
          <VStack gap={2}>
            <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Grid>
            {pager ? (
              <Pagination
                currentPage={pager.current_page}
                totalPages={pager.total_pages}
                onPrev={() => goToPage(page - 1)}
                onNext={() => goToPage(page + 1)}
              />
            ) : null}
          </VStack>
        ) : null}
      </VStack>
    </AppShell>
  );
}
