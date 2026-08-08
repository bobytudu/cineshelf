/**
 * Titles often embed language as a trailing bracket tag,
 * e.g. "The Last House [Hindi] ".
 */
export function languageFromMovieTitle(title: string): string | null {
  const match = title.match(/\[([^\]]+)\]\s*$/u);
  if (!match) return null;
  const language = match[1].trim();
  return language.length > 0 ? language : null;
}

export function displayTitleFromMovieTitle(title: string): string {
  return title
    .replace(/\s*\[[^\]]*\]\s*$/u, '')
    .replace(/\s+/gu, ' ')
    .trim();
}
