import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '@astryxdesign/core/AppShell';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Button } from '@astryxdesign/core/Button';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { fetchMovieDetail, type MovieDetail } from '../api/movieDetail';
import { fetchRelatedMovies } from '../api/related';
import type { Movie } from '../api/movies';
import { MovieCard } from '../components/MovieCard';

export function MovieDetailPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [related, setRelated] = useState<Movie[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [relatedStatus, setRelatedStatus] = useState<
    'idle' | 'loading' | 'error' | 'ready'
  >('idle');
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!id) {
      setStatus('error');
      setError('Missing movie id');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);
    setRelated([]);
    setRelatedStatus('idle');

    fetchMovieDetail({ id })
      .then(async (data) => {
        if (cancelled) return;
        setMovie(data);
        setStatus('ready');
        setRelatedStatus('loading');
        try {
          const items = await fetchRelatedMovies({ title: data.title });
          if (cancelled) return;
          setRelated(items.filter((item) => item.id !== data.id));
          setRelatedStatus('ready');
        } catch {
          if (cancelled) return;
          setRelatedStatus('error');
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to load movie');
      });

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  return (
    <AppShell height="auto" contentPadding={4}>
      <VStack gap={6} maxWidth={1152} width="100%">
        <Link href="/" isStandalone>
          Back to movies
        </Link>

        {status === 'loading' ? (
          <Text color="secondary">Loading movie…</Text>
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

        {status === 'ready' && movie ? (
          <>
            <VStack gap={4} maxWidth={640}>
              <AspectRatio ratio={16 / 9} fit="cover">
                <img src={movie.backdrop_path} alt="" />
              </AspectRatio>
              <Heading level={1}>{movie.title.trim()}</Heading>
              <MetadataList columns="multi">
                <MetadataListItem label="Rating">
                  {movie.vote_average}
                </MetadataListItem>
                <MetadataListItem label="Released">
                  {movie.release_date}
                </MetadataListItem>
                <MetadataListItem label="Type">
                  {movie.media_type}
                </MetadataListItem>
                <MetadataListItem label="Country">
                  {movie.country}
                </MetadataListItem>
              </MetadataList>
              {movie.dis ? (
                <Section variant="muted" padding={4}>
                  <Text as="p">{movie.dis}</Text>
                </Section>
              ) : null}
            </VStack>

            <VStack gap={3}>
              <Heading level={2}>Related</Heading>
              {relatedStatus === 'loading' ? (
                <Text color="secondary">Loading related movies…</Text>
              ) : null}
              {relatedStatus === 'error' ? (
                <Text color="secondary">Could not load related movies.</Text>
              ) : null}
              {relatedStatus === 'ready' && related.length === 0 ? (
                <Text color="secondary">No related movies found.</Text>
              ) : null}
              {relatedStatus === 'ready' && related.length > 0 ? (
                <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
                  {related.map((item) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
                </Grid>
              ) : null}
            </VStack>
          </>
        ) : null}
      </VStack>
    </AppShell>
  );
}
