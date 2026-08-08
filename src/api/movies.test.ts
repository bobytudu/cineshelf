import { describe, it, expect, vi } from 'vitest';
import { buildMoviesUrl, fetchMovies } from './movies';

describe('buildMoviesUrl', () => {
  it('builds relative and absolute filter URLs', () => {
    const relative = buildMoviesUrl(2);
    expect(relative.startsWith('/api/movies/filter?')).toBe(true);
    expect(relative).toContain('sort_by=date');
    expect(relative).toContain('dubbing=Hindi');
    expect(relative).toContain('country=india');
    expect(relative).toContain('items_per_page=30');
    expect(relative).toContain('cache=home');
    expect(relative).toContain('page=2');

    const absolute = buildMoviesUrl(2, { absolute: true });
    expect(absolute).toContain('https://api2.imdb3.shop/api/movies/filter?');
    expect(absolute).toContain('page=2');
  });

  it('adds type filter when category is not all', () => {
    expect(buildMoviesUrl(0, { type: 'movie' })).toContain('type=movie');
    expect(buildMoviesUrl(0, { type: 'all' })).not.toContain('type=');
  });
});


describe('fetchMovies', () => {
  it('requests the filter API with fixed filters and page', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: '1',
            title: 'Test',
            backdrop_path: 'https://example.com/a.jpg',
            release_date: '2026',
            media_type: 'movie',
            vote_average: '7.0',
            channel: '',
            cn: 'India',
          },
        ],
        pager: {
          current_page: 2,
          items_per_page: 30,
          total_pages: 10,
          total_results: 300,
        },
      }),
    });

    const data = await fetchMovies({ page: 2, fetchImpl });

    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl.mock.calls[0][0]).toBe(buildMoviesUrl(2));
    expect(data.results).toHaveLength(1);
    expect(data.pager.current_page).toBe(2);
  });

  it('throws when response is not ok', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(fetchMovies({ page: 0, fetchImpl })).rejects.toThrow(/500/);
  });
});
