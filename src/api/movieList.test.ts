import { describe, it, expect, vi } from 'vitest';
import { buildMovieListUrl, fetchMovieList } from './movieList';

describe('buildMovieListUrl', () => {
  it('builds the list filter URL with fixed params', () => {
    const url = buildMovieListUrl(0);
    expect(url.startsWith('/api/movies/list/filter?')).toBe(true);
    expect(url).toContain('page=0');
    expect(url).toContain('type=1');
    expect(url).toContain('countryNot=Nigeria');
    expect(url).toContain('countryNot2=Philippines');
    expect(url).toContain('sort_by=date');
  });
});

describe('fetchMovieList', () => {
  it('requests the list filter API', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: '111700',
            title: 'The Last House',
            backdrop_path: 'https://example.com/a.jpg',
            release_date: '2026',
            media_type: 'movie',
            vote_average: '6.0',
            cn: 'United Kingdom',
          },
        ],
        pager: {
          current_page: 0,
          items_per_page: 30,
          total_pages: 10,
          total_results: 300,
        },
      }),
    });

    const data = await fetchMovieList({ page: 0, fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith(buildMovieListUrl(0));
    expect(data.results).toHaveLength(1);
  });
});
