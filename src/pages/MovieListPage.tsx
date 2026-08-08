import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@astryxdesign/core/Button';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { fetchMovieList } from '../api/movieList';
import type { Movie, MoviesPager } from '../api/movies';
import { parsePageParam } from '../lib/pageParam';
import { MovieCard } from '../components/MovieCard';
import { PageShell } from '../components/PageShell';
import { Pagination } from '../components/Pagination';

export function MovieListPage() {
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

    fetchMovieList({ page })
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
        <Heading level={1} type="display-2" justify="center">
          Movie
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
            {movies.length === 0 ? (
              <Text color="secondary" justify="center">
                No movies found.
              </Text>
            ) : (
              <Grid columns={{ minWidth: 280, max: 3 }} gap={4} width="100%">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </Grid>
            )}
            {pager ? (
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
