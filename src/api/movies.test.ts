import { describe, it, expect, vi } from 'vitest';
import { fetchMovies } from './movies';

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
    const url = String(fetchImpl.mock.calls[0][0]);
    expect(url).toContain('https://api2.imdb3.shop/api/movies/filter?');
    expect(url).toContain('sort_by=date');
    expect(url).toContain('dubbing=Hindi');
    expect(url).toContain('country=india');
    expect(url).toContain('items_per_page=30');
    expect(url).toContain('cache=home');
    expect(url).toContain('page=2');
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
