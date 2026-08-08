import { describe, it, expect, vi } from 'vitest';
import { buildRelatedMoviesUrl, fetchRelatedMovies } from './related';

describe('buildRelatedMoviesUrl', () => {
  it('encodes the bare title for the related endpoint', () => {
    expect(
      buildRelatedMoviesUrl('Spider-Man: Brand New Day [Hindi]\n', 0),
    ).toBe('/api/related/Spider-Man%3A+Brand+New+Day?page=0');

    expect(
      buildRelatedMoviesUrl('Spider-Man: Brand New Day [Hindi]\n', 0, {
        absolute: true,
      }),
    ).toBe(
      'https://api2.imdb4.shop/api/related/Spider-Man%3A+Brand+New+Day?page=0',
    );
  });
});

describe('fetchRelatedMovies', () => {
  it('returns related results', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: '122801',
            title: 'Spider-Man: Brand New Day [English]',
            backdrop_path: 'https://example.com/a.jpg',
            release_date: '2026',
            media_type: 'movie',
            vote_average: '8.4',
            cn: 'United States',
          },
        ],
      }),
    });

    const movies = await fetchRelatedMovies({
      title: 'Spider-Man: Brand New Day [Hindi]',
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      buildRelatedMoviesUrl('Spider-Man: Brand New Day [Hindi]'),
    );
    expect(movies).toHaveLength(1);
  });
});
