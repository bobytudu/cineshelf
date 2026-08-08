# Movie Website — Design Spec

Date: 2026-08-08  
Status: Approved for planning (pending user review of this file)

## Goal

Greenfield Vite + React + TypeScript SPA that lists Hindi/India movies from the imdb3 filter API, styled with Astryx Design + Tailwind. Detail APIs come later; home is the first vertical slice.

## Stack

- Vite (React + TypeScript)
- `@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@astryxdesign/cli` (`npx @astryxdesign/cli init` for agent docs; follow generated conventions)
- Tailwind CSS (alongside Astryx)
- React Router for routing

## Approach

Lean SPA: thin fetch helper + local loading/error state. No TanStack Query or BFF until more endpoints or CORS/auth require them.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home: movie grid + pagination |
| `/movie/:id` | Detail stub (placeholder until detail API is wired) |

Home page index is mirrored in the URL as `?page=0` (0-based, matching the API) so refresh and back/forward work.

## API

**Endpoint**

```
GET https://api2.imdb3.shop/api/movies/filter
  ?sort_by=date
  &dubbing=Hindi
  &country=india
  &items_per_page=30
  &cache=home
  &page={n}
```

**Relevant response shape**

- `results[]`: `id`, `title`, `backdrop_path`, `release_date`, `media_type`, `vote_average`, `channel`, `cn`
- `pager`: `current_page`, `items_per_page`, `total_pages`, `total_results`

Fixed filters for v1: `sort_by=date`, `dubbing=Hindi`, `country=india`, `items_per_page=30`, `cache=home`. Only `page` is dynamic.

## UI

- **Home:** Responsive backdrop grid (not limited to 7; 30 per page). Each card shows image, title, year, rating; links to `/movie/:id`.
- **Pagination:** Prev / next plus “Page X of Y” from `pager`. Disable prev on first page and next on last page.
- **Detail stub:** Shows the movie `id` (and optionally title if passed later); no stream/detail API yet.
- **States:** Loading while fetching; short error + retry on failure; broken-image fallback on cards.

## File layout (approx.)

```
src/
  api/movies.ts              # types + fetchMovies({ page })
  pages/HomePage.tsx         # fetch, grid, pagination
  pages/MovieDetailPage.tsx  # stub
  components/MovieCard.tsx
  components/Pagination.tsx
  App.tsx                    # routes + Astryx theme provider
```

## Data flow

1. Home reads `page` from `?page=` (default `0`).
2. `fetchMovies({ page })` runs on page change.
3. Map `results` into `MovieCard` grid.
4. Card navigates to `/movie/:id`.
5. Pagination updates `?page=` (and thus refetches).

## Out of scope (v1)

- Movie detail / playback APIs
- Search, genre filters, dubbing/country pickers
- Auth, favorites, accounts
- TanStack Query / server-side rendering
- SEO / SSR

## Success criteria

- `npm create vite` project runs with Astryx init docs present and Tailwind working.
- Home loads 30 Hindi/India movies from the filter API.
- Pagination changes page via URL and refetches correctly.
- Movie cards navigate to a working detail stub route.
