# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun run dev       # Start Astro dev server (http://localhost:4321)
bun run build     # Astro production build
bun run lint      # Run ESLint
bun run preview   # Preview production build locally
```

## Architecture Overview

This is a static-first portfolio built with Astro and React islands:
- **Astro 5** - Static site framework with `output: "static"`
- **React 18** - Interactive islands via `@astrojs/react`
- **TypeScript** for type safety
- **Framer Motion** for interactive animations in React islands
- **Vanilla CSS** with CSS variables for theming

### Routing Structure

Routes are defined in `src/pages/`:
- `index.astro` - Home page with all portfolio sections
- `work/` - Case study detail pages generated from project data
- `404.astro` - Custom 404 page

Layout shell lives in `src/layouts/Layout.astro`.

### Component Architecture

- `src/components/astro/` - Static Astro sections (rendered at build time)
- `src/components/react/` - Client-hydrated React islands (interactive UI)

### Styling System

CSS variables are defined in `src/styles/global.css`:
- Dark theme (default) and light theme via `[data-theme="light"]`
- Lime accent color: `--accent-lime`
- Premium easing curves: `--ease-out-expo`, `--ease-elastic`, etc.
- Each component has co-located CSS files

### Key Patterns

- Static Astro components for content-heavy sections, React islands for interactivity
- Framer Motion variants for staggered and viewport-triggered animations
- Theme toggle persists to localStorage
- Viewport observer script in `src/scripts/` for active section tracking
- OpenPanel analytics tracking (`src/openpanel.ts`)
- Project data shared via `src/data/`
