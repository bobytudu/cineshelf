import type { Movie, MoviesFilterResponse, MoviesPager } from './movies';

export function buildSearchUrl(
  query: string,
  page = 0,
  options?: { absolute?: boolean },
): string {
  const encoded = encodeURIComponent(query.trim());
  const path = `/api/search2/${encoded}?page=${page}`;
  if (options?.absolute) {
    return `https://api2.imdb4.shop${path}`;
  }
  return path;
}

export async function searchMovies(options: {
  query: string;
  page?: number;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
}): Promise<{ results: Movie[]; pager: MoviesPager }> {
  const { query, page = 0, fetchImpl = fetch, signal } = options;
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      results: [],
      pager: {
        current_page: 0,
        items_per_page: 30,
        total_pages: 0,
        total_results: 0,
      },
    };
  }

  const res = await fetchImpl(buildSearchUrl(trimmed, page), { signal });
  if (!res.ok) {
    throw new Error(`Failed to search movies (${res.status})`);
  }
  const data = (await res.json()) as MoviesFilterResponse;
  return {
    results: data.results ?? [],
    pager: data.pager,
  };
}
