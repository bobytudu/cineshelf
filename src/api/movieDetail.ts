export type MovieDetail = {
  id: string;
  title: string;
  backdrop_path: string;
  release_date: string;
  media_type: string;
  vote_average: string;
  country: string;
  dis: string;
  duration: string;
};

export type MovieDetailResponse = {
  results: MovieDetail[];
};

export function buildMovieDetailUrl(
  id: string,
  options?: { absolute?: boolean },
): string {
  const path = `/api/movie/${encodeURIComponent(id)}`;
  if (options?.absolute) {
    return `https://api2.imdb3.shop${path}`;
  }
  return path;
}

export async function fetchMovieDetail(options: {
  id: string;
  fetchImpl?: typeof fetch;
}): Promise<MovieDetail> {
  const { id, fetchImpl = fetch } = options;
  const res = await fetchImpl(buildMovieDetailUrl(id));
  if (!res.ok) {
    throw new Error(`Failed to fetch movie (${res.status})`);
  }
  const data = (await res.json()) as MovieDetailResponse;
  const movie = data.results?.[0];
  if (!movie) {
    throw new Error('Movie not found');
  }
  return movie;
}
