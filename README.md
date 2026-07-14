# SST Raster Globe

Interactive web map for exploring daily sea surface temperature (SST) data with local raster and vector contour tiles.

## What This Project Is

This app renders a MapLibre globe/map and overlays SST datasets by day.

- Raster SST layer from PNG tiles
- Contour SST layer from gzipped PBF vector tiles
- Date selector for June 2026 snapshots
- Layer toggle controls in a sidebar
- Shareable map position through URL hash (zoom/lng/lat)

Core files:

- `src/App.tsx` initializes the map, tile sources, and layer visibility
- `src/constants.ts` defines map layers and date options
- `src/components/Sidebar.tsx` provides date and layer controls
- `vite.config.ts` ensures local PBF responses have proper headers
- `vercel.json` sets production headers and SPA rewrites

## Stack

- React 19
- TypeScript
- Vite
- MapLibre GL
- Oxlint

## Prerequisites

- Node.js 20+
- npm 10+

## How To Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open the URL printed in terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build production assets
- `npm run preview` - preview production build locally
- `npm run lint` - run Oxlint
- `npm run build:ci` - run `deploy.sh` (fetch/extract LFS asset archive, then build)

## Data Layout

The app expects static assets under `public`.

- `public/raster/YYYYMMDD/{z}/{x}/{y}.png`
- `public/contours/YYYYMMDD/{z}/{x}/{y}.pbf`
- `public/style.json` (MapLibre style)
- `public/tiles` and `public/font` (base map assets)

Date folders should match the selected values (for example `20260601` through `20260630`).

## Tile Headers (Important)

Contour PBF files are pre-compressed and must be served with:

- `Content-Type: application/x-protobuf`
- `Content-Encoding: gzip`

This is handled:

- In development by middleware in `vite.config.ts`
- In production by header rules in `vercel.json`

## URL Hash Behavior

The app keeps map view in URL hash format:

`#zoom/lng/lat`

On reload, the map restores to that position.

## Deployment Notes

- Designed for static hosting (for example Vercel)
- `vercel.json` includes a catch-all rewrite to `index.html`
- Ensure all required tile directories are included in deployment output

## Trade-offs

- Statically hosted all the vector and raster tiles to simplify deployment. No external tile server, for vercel (where this is deployed) caching is also automatically done.

- The tiles are fetched during deployment using git lfs, see `deploy.sh`
- The files need to be repacked (as tarball) for every update to the tiles and refetched during deployment, this is where a separate server would have been more efficient.

## Troubleshooting

- Map appears but SST overlays are missing:
  - verify date folders exist in both `public/raster` and `public/contours`
  - check network requests for missing tiles (404)
- Contours do not draw:
  - confirm response headers include gzip encoding for `.pbf`
- Build issues in CI:
  - review `deploy.sh` behavior around Git LFS and remote configuration
