import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { Link as RouterLink } from 'react-router-dom';
import type { ComponentProps } from 'react';
import { MovieCard } from './MovieCard';
import type { Movie } from '../api/movies';

const movie: Movie = {
  id: '122807',
  title: 'Bhai Tera Star Hai [Hindi]',
  backdrop_path: 'https://example.com/poster.jpg',
  release_date: '2026',
  media_type: 'movie',
  vote_average: '6.1',
  channel: '',
  cn: 'India',
};

function AppLink({
  href,
  to,
  ...rest
}: Omit<ComponentProps<typeof RouterLink>, 'to'> & {
  href?: string;
  to?: string;
}) {
  return <RouterLink to={to ?? href ?? '/'} {...rest} />;
}

describe('MovieCard', () => {
  it('links to detail and shows metadata', () => {
    render(
      <Theme theme={neutralTheme}>
        <MemoryRouter>
          <LinkProvider component={AppLink}>
            <MovieCard movie={movie} />
          </LinkProvider>
        </MemoryRouter>
      </Theme>,
    );

    const link = screen.getByRole('link', { name: /bhai tera star hai/i });
    expect(link).toHaveAttribute('href', '/movie/122807');
    expect(screen.getByText('Bhai Tera Star Hai')).toBeInTheDocument();
    expect(screen.getByText('2026 · 6.1 · Hindi')).toBeInTheDocument();
  });
});

