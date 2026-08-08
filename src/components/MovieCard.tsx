import { useState } from 'react';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import type { Movie } from '../api/movies';
import {
  displayTitleFromMovieTitle,
  languageFromMovieTitle,
} from '../lib/movieTitle';

export function MovieCard({ movie }: { movie: Movie }) {
  const [imgFailed, setImgFailed] = useState(false);
  const title = displayTitleFromMovieTitle(movie.title);
  const language = languageFromMovieTitle(movie.title);

  return (
    <ClickableCard
      label={movie.title}
      href={`/movie/${movie.id}`}
      padding={0}
      elevation="low"
    >
      <VStack gap={0}>
        <AspectRatio ratio={16 / 9} fit="cover">
          {!imgFailed ? (
            <img
              src={movie.backdrop_path}
              alt=""
              onError={() => setImgFailed(true)}
            />
          ) : (
            <Text as="p" color="secondary" justify="center">
              No image
            </Text>
          )}
        </AspectRatio>
        <VStack gap={1} padding={3}>
          <Text type="large" weight="bold" maxLines={2}>
            {title}
          </Text>
          <Text type="supporting" color="secondary">
            {[movie.release_date, movie.vote_average, language]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        </VStack>
      </VStack>
    </ClickableCard>
  );
}
