import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@astryxdesign/core/Card';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { searchMovies } from '../api/search';
import type { Movie } from '../api/movies';

const DEBOUNCE_MS = 250;
const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 8;

export function MovieSearchBox({ initialQuery = '' }: { initialQuery?: string }) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setIsLoading(true);
      searchMovies({ query: trimmed, page: 0, signal: controller.signal })
        .then((data) => {
          setResults(data.results.slice(0, MAX_SUGGESTIONS));
          setIsOpen(true);
          setActiveIndex(-1);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === 'AbortError') return;
          setResults([]);
          setIsOpen(false);
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  function goToResults() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsOpen(false);
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
  }

  function goToMovie(id: string) {
    setIsOpen(false);
    navigate(`/movie/${id}`);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      goToMovie(results[activeIndex].id);
      return;
    }
    goToResults();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (!isOpen || results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? results.length - 1 : index - 1,
      );
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  const showDropdown = isOpen && results.length > 0;

  return (
    <form
      ref={rootRef}
      className="relative w-[340px]"
      role="search"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <TextInput
        label="Search movies"
        isLabelHidden
        value={query}
        onChange={setQuery}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        placeholder="Search movies"
        startIcon="search"
        hasClear
        isLoading={isLoading}
        width="100%"
        size="sm"
      />

      {showDropdown ? (
        <Card
          padding={1}
          elevation="med"
          className="absolute left-0 right-0 top-full z-50 mt-1"
        >
          <VStack gap={0}>
            {results.map((movie, index) => (
              <ClickableCard
                key={movie.id}
                label={movie.title}
                padding={2}
                variant={index === activeIndex ? 'muted' : 'transparent'}
                onClick={() => goToMovie(movie.id)}
              >
                <HStack gap={2} vAlign="center">
                  <img
                    src={movie.backdrop_path}
                    alt=""
                    className="h-12 w-10 shrink-0 rounded-sm object-cover"
                  />
                  <VStack gap={0}>
                    <Text maxLines={1}>{movie.title}</Text>
                    <Text type="supporting" color="secondary" maxLines={1}>
                      {movie.release_date} · {movie.media_type}
                    </Text>
                  </VStack>
                </HStack>
              </ClickableCard>
            ))}
            <ClickableCard
              label={`See all results for ${query.trim()}`}
              padding={2}
              variant="transparent"
              onClick={goToResults}
            >
              <Text color="accent">See all results for “{query.trim()}”</Text>
            </ClickableCard>
          </VStack>
        </Card>
      ) : null}
    </form>
  );
}
