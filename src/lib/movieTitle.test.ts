import { describe, it, expect } from 'vitest';
import {
  displayTitleFromMovieTitle,
  languageFromMovieTitle,
} from './movieTitle';

describe('languageFromMovieTitle', () => {
  it('extracts trailing language tags', () => {
    expect(languageFromMovieTitle('The Last House [Hindi] ')).toBe('Hindi');
    expect(languageFromMovieTitle('Beast Race [English]')).toBe('English');
  });

  it('returns null when no tag is present', () => {
    expect(languageFromMovieTitle('The Last House ')).toBeNull();
  });
});

describe('displayTitleFromMovieTitle', () => {
  it('strips language tags for display', () => {
    expect(displayTitleFromMovieTitle('The Last House [Hindi] ')).toBe(
      'The Last House',
    );
  });
});
