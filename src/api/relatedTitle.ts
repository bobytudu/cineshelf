import { displayTitleFromMovieTitle } from '../lib/movieTitle';

/**
 * Related API expects the bare title (e.g. "Spider-Man: Brand New Day"),
 * while detail titles often include a language tag and trailing whitespace
 * (e.g. "Spider-Man: Brand New Day [Hindi]\\n").
 */
export function relatedTitleFromMovieTitle(title: string): string {
  return displayTitleFromMovieTitle(title);
}
