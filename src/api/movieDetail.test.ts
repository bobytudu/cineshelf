import { describe, it, expect, vi } from 'vitest';
import { buildMovieDetailUrl, fetchMovieDetail } from './movieDetail';

describe('fetchMovieDetail', () => {
  it('requests /api/movie/:id and returns the first result', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: '122804',
            title: 'Spider-Man: Brand New Day [Hindi]\n',
            backdrop_path: 'https://example.com/a.jpg',
            release_date: 'Jul 29,2026',
            media_type: 'tv',
            vote_average: '8.4',
            country: 'United States',
            dis: 'A plot.',
            duration: '0',
          },
        ],
      }),
    });

    const movie = await fetchMovieDetail({ id: '122804', fetchImpl });

    expect(fetchImpl).toHaveBeenCalledWith(buildMovieDetailUrl('122804'));
    expect(movie.id).toBe('122804');
    expect(movie.title).toContain('Spider-Man');
  });

  it('throws when results are empty', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
    await expect(
      fetchMovieDetail({ id: 'missing', fetchImpl }),
    ).rejects.toThrow(/not found/i);
  });
});
