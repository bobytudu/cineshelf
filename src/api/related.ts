import type { Movie, MoviesFilterResponse } from './movies';
import { relatedTitleFromMovieTitle } from './relatedTitle';

export function buildRelatedMoviesUrl(
  title: string,
  page = 0,
  options?: { absolute?: boolean },
): string {
  const bare = relatedTitleFromMovieTitle(title);
  const encoded = encodeURIComponent(bare).replace(/%20/g, '+');
  const path = `/api/related/${encoded}?page=${page}`;
  if (options?.absolute) {
    return `https://api2.imdb4.shop${path}`;
  }
  return path;
}

export async function fetchRelatedMovies(options: {
  title: string;
  page?: number;
  fetchImpl?: typeof fetch;
}): Promise<Movie[]> {
  const { title, page = 0, fetchImpl = fetch } = options;
  const res = await fetchImpl(buildRelatedMoviesUrl(title, page));
  if (!res.ok) {
    throw new Error(`Failed to fetch related movies (${res.status})`);
  }
  const data = (await res.json()) as MoviesFilterResponse;
  return data.results ?? [];
}
