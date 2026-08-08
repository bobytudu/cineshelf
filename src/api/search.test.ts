import { describe, it, expect, vi } from 'vitest';
import { buildSearchUrl, searchMovies } from './search';

describe('buildSearchUrl', () => {
  it('encodes the query path for search2', () => {
    expect(buildSearchUrl('musafi', 0)).toBe('/api/search2/musafi?page=0');
    expect(buildSearchUrl('Spider-Man: Day', 1, { absolute: true })).toBe(
      'https://api2.imdb4.shop/api/search2/Spider-Man%3A%20Day?page=1',
    );
  });
});

describe('searchMovies', () => {
  it('fetches search results', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: '122770',
            title: 'Musafir Cafe [Hindi] S1',
            backdrop_path: 'https://example.com/a.jpg',
            release_date: '2026',
            media_type: 'tv',
            vote_average: '6.9',
            cn: 'India',
          },
        ],
        pager: {
          current_page: 0,
          items_per_page: 30,
          total_pages: 1,
          total_results: 1,
        },
      }),
    });

    const data = await searchMovies({ query: 'musafi', fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith('/api/search2/musafi?page=0', {
      signal: undefined,
    });
    expect(data.results).toHaveLength(1);
  });

  it('returns empty results for blank query without fetching', async () => {
    const fetchImpl = vi.fn();
    const data = await searchMovies({ query: '  ', fetchImpl });
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(data.results).toHaveLength(0);
  });
});
