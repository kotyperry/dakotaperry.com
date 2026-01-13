# Dakota Perry - Portfolio

A modern, responsive portfolio website built with Vite, React, and TypeScript.

## Features

- **Animated Hero Section** - Rotating text animation showcasing different roles
- **Smooth Scrolling** - Navigation with smooth scroll between sections
- **Fullscreen Menu** - Animated menu overlay with navigation and social links
- **Contact Form** - Form that opens email client with pre-filled message
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Framer Motion** - Smooth animations and transitions throughout
- **Active Section Indicator** - Side navigation shows current section

## Tech Stack

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Hero section with animated text
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills listing section
│   ├── Portfolio.tsx     # Portfolio section
│   ├── Contact.tsx       # Contact form section
│   ├── Navigation.tsx    # Top navigation bar
│   ├── SideNav.tsx       # Left side navigation
│   ├── Menu.tsx          # Fullscreen menu overlay
│   └── Footer.tsx        # Footer component
├── App.tsx               # Main app component
├── App.css               # App-level styles
├── index.css             # Global styles and CSS variables
└── main.tsx              # Entry point
```

## Deployment

Build the project and deploy the `dist` folder to any static hosting:

```bash
npm run build
```

Compatible with:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static file server

## License

© 2026 Dakota Perry. All Rights Reserved.
