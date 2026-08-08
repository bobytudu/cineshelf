import { describe, it, expect } from 'vitest';
import { relatedTitleFromMovieTitle } from './relatedTitle';

describe('relatedTitleFromMovieTitle', () => {
  it('strips language tag and whitespace', () => {
    expect(
      relatedTitleFromMovieTitle('Spider-Man: Brand New Day [Hindi]\n'),
    ).toBe('Spider-Man: Brand New Day');
  });

  it('leaves bare titles unchanged', () => {
    expect(relatedTitleFromMovieTitle('Spider-Man: Brand New Day')).toBe(
      'Spider-Man: Brand New Day',
    );
  });
});
