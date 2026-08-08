import { useState } from 'react';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import type { Movie } from '../api/movies';

export function MovieCard({ movie }: { movie: Movie }) {
  const [imgFailed, setImgFailed] = useState(false);

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
          <Text maxLines={2}>{movie.title}</Text>
          <HMeta releaseDate={movie.release_date} rating={movie.vote_average} />
        </VStack>
      </VStack>
    </ClickableCard>
  );
}

function HMeta({
  releaseDate,
  rating,
}: {
  releaseDate: string;
  rating: string;
}) {
  return (
    <Text type="supporting" color="secondary">
      {releaseDate} · {rating}
    </Text>
  );
}
