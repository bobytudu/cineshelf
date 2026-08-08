import type { MoviesFilterResponse } from './movies';

/** Browser calls go through the Vite proxy to avoid CORS. */
const RELATIVE_BASE = '/api/movies/list/filter';
const ABSOLUTE_BASE = 'https://api2.imdb3.shop/api/movies/list/filter';

export function buildMovieListUrl(
  page: number,
  options?: { absolute?: boolean },
): string {
  const base = options?.absolute ? ABSOLUTE_BASE : RELATIVE_BASE;
  const url = new URL(base, 'https://api2.imdb3.shop');
  url.searchParams.set('page', String(page));
  url.searchParams.set('type', '1');
  url.searchParams.set('countryNot', 'Nigeria');
  url.searchParams.set('countryNot2', 'Philippines');
  url.searchParams.set('sort_by', 'date');
  if (options?.absolute) {
    return url.toString();
  }
  return `${url.pathname}?${url.searchParams.toString()}`;
}

export async function fetchMovieList(options: {
  page: number;
  fetchImpl?: typeof fetch;
}): Promise<MoviesFilterResponse> {
  const { page, fetchImpl = fetch } = options;
  const res = await fetchImpl(buildMovieListUrl(page));
  if (!res.ok) {
    throw new Error(`Failed to fetch movie list (${res.status})`);
  }
  return (await res.json()) as MoviesFilterResponse;
}
