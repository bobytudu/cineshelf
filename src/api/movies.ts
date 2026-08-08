export type Movie = {
  id: string;
  title: string;
  backdrop_path: string;
  release_date: string;
  media_type: string;
  vote_average: string;
  channel?: string;
  cn?: string;
};

export type MoviesPager = {
  current_page: number;
  items_per_page: number;
  total_pages: number;
  total_results: number;
};

export type MoviesFilterResponse = {
  results: Movie[];
  pager: MoviesPager;
};

/** Browser calls go through the Vite proxy to avoid CORS. */
const RELATIVE_BASE = '/api/movies/filter';
const ABSOLUTE_BASE = 'https://api2.imdb3.shop/api/movies/filter';

export function buildMoviesUrl(
  page: number,
  options?: { absolute?: boolean },
): string {
  const base = options?.absolute ? ABSOLUTE_BASE : RELATIVE_BASE;
  const url = new URL(base, 'https://api2.imdb3.shop');
  url.searchParams.set('sort_by', 'date');
  url.searchParams.set('dubbing', 'Hindi');
  url.searchParams.set('country', 'india');
  url.searchParams.set('items_per_page', '30');
  url.searchParams.set('cache', 'home');
  url.searchParams.set('page', String(page));
  if (options?.absolute) {
    return url.toString();
  }
  return `${url.pathname}?${url.searchParams.toString()}`;
}

export async function fetchMovies(options: {
  page: number;
  fetchImpl?: typeof fetch;
}): Promise<MoviesFilterResponse> {
  const { page, fetchImpl = fetch } = options;
  const res = await fetchImpl(buildMoviesUrl(page));
  if (!res.ok) {
    throw new Error(`Failed to fetch movies (${res.status})`);
  }
  return (await res.json()) as MoviesFilterResponse;
}
