# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # TypeScript compile + Vite production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture Overview

This is a React SPA portfolio website using:
- **React 18** with TypeScript
- **Vite** for build tooling
- **TanStack Router** for file-based routing
- **Framer Motion** for animations
- **Vanilla CSS** with CSS variables for theming

### Routing Structure

Routes are defined in `src/routes/`:
- `__root.tsx` - Root layout (theme provider, navigation, sidebar)
- `index.tsx` - Home page with all portfolio sections
- `work/$projectId.tsx` - Dynamic project detail pages

### Styling System

CSS variables are defined in `src/index.css`:
- Dark theme (default) and light theme via `[data-theme="light"]`
- Orange accent color: `--accent-orange`
- Premium easing curves: `--ease-out-expo`, `--ease-elastic`, etc.
- Each component has co-located CSS files

### Key Patterns

- Components live in `src/components/` with co-located `.css` files
- Framer Motion variants for staggered and viewport-triggered animations
- Theme toggle persists to localStorage
- OpenPanel analytics tracking (`src/openpanel.ts`)
