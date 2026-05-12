# Dakota Perry - Portfolio

A static-first portfolio built with Astro and React islands.

## Features

- Static HTML sections for content-heavy pages
- React islands for interactive UI (navigation, sidebar, loader, form, stats, footer)
- Smooth scroll section navigation and active section tracking
- Theme toggle with persisted preference
- Formspree-backed contact form
- Static case-study pages generated from project data

## Tech Stack

- [Astro](https://astro.build/) - Static site framework
- [React](https://react.dev/) - Interactive islands
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Framer Motion](https://www.framer.com/motion/) - Interactive animation for islands

## Getting Started

### Prerequisites

- [Bun](https://bun.com/) 1.0+

### Installation

```bash
bun install
bun run dev
bun run build
bun run preview
```

## Project Structure

```
src/
├── components/
│   ├── astro/            # Static Astro sections
│   └── react/            # Client-hydrated React islands
├── data/                 # Shared project data
├── layouts/              # Astro layout shell
├── pages/                # Astro routes
├── scripts/              # Client scripts (viewport observer)
└── styles/               # Global CSS
```

## Deployment

Build and deploy `dist/` to any static host.

```bash
bun run build
```

## License

© 2026 Dakota Perry. All Rights Reserved.
