# CineShelf

Browse, search, and explore movies and TV shows — Hindi and multi-language releases, related titles, and detail pages.

## Stack

- Vite + React + TypeScript
- [Astryx Design](https://astryx.atmeta.com/) + Tailwind CSS
- React Router

## Develop

```bash
npm install
npm run dev
```

Optional AdSense (left/right rails): copy `.env.example` to `.env` and set your publisher/slot IDs.

```bash
npm test
npm run build
```

## Deploy

Configured for Vercel. API routes are proxied via `vercel.json` to the upstream movie APIs.
