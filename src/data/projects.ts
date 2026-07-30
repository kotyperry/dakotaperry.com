export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  tech: string[];
  year: string;
  color: string;
  role: string;
  duration: string;
  client?: string;
  liveUrl?: string;
  media: ProjectMedia[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "digital-asset-manager",
    title: "Foundry",
    category: "SaaS Product",
    description:
      "AI-powered digital asset management platform spanning web, desktop, and Adobe Creative Cloud.",
    fullDescription:
      "A full digital asset management platform built for a creative agency's production workflow. The system spans a React web app, a Tauri desktop shell, a Next.js admin app, Adobe Creative Cloud plugins, and a dedicated media-processing service — all backed by Convex for the realtime data layer and Cloudflare R2 for storage. AI enrichment runs through Google Cloud Vision, Gemini, and Hugging Face models to auto-tag, classify, and make thousands of assets searchable, while Trigger.dev handles background ingest and processing jobs.",
    tech: [
      "React 19",
      "TypeScript",
      "Convex",
      "Tauri 2",
      "Next.js",
      "Trigger.dev",
      "Cloudflare R2",
      "Better Auth",
      "Google Cloud Vision",
      "Gemini",
    ],
    year: "2026",
    color: "#1a1a2e",
    role: "Architect / Sole Developer",
    duration: "6+ months",
    client: "Idea Ranch",
    liveUrl: "https://foundry.dakotaperry.com",
    highlights: [
      "Architected a monorepo covering web app, desktop shell, admin app, backend, and Adobe CC plugins",
      "Built AI auto-tagging and visual search using Google Cloud Vision, Gemini, and Hugging Face",
      "Realtime sync across every client via Convex, with Better Auth for organization-level access",
      "Background media ingest and processing pipeline on Trigger.dev with Cloudflare R2 storage",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/dam-promo.mp4",
        alt: "Digital Asset Manager product walkthrough",
        caption: "A walkthrough of the Digital Asset Manager in action.",
      },
      {
        type: "image",
        src: "/images/projects/dam-grid.jpg",
        alt: "Foundry asset library grid with folders, tags, and AI-powered search",
        caption: "The asset library — folders, tags, favorites, and search across filenames, AI labels, and text in files.",
      },
      {
        type: "image",
        src: "/images/projects/dam-detail.jpg",
        alt: "Asset detail view with AI description, AI tags, and metadata panel",
        caption: "Asset detail with the AI enrichment panel — auto-generated descriptions, tags, and full metadata.",
      },
      {
        type: "image",
        src: "/images/projects/dam-products.jpg",
        alt: "Product Shots folder with tagged and favorited assets",
        caption: "Organized folders with tag filters — every asset classified and browsable in seconds.",
      },
      {
        type: "image",
        src: "/images/projects/dam-upload.jpg",
        alt: "Upload dialog supporting drag-and-drop of files and folders",
        caption: "Drag-and-drop ingest — files route through the Trigger.dev processing pipeline into R2 storage.",
      },
    ],
  },
  {
    id: "flux",
    title: "Flux",
    category: "Mobile App",
    description:
      "Personal budgeting app with bucket-based budgets and automatic bank sync via Plaid.",
    fullDescription:
      "Flux is an envelope-style budgeting app built as a React Native (Expo) mobile app on a Turborepo monorepo. Money is organized into buckets — assign every dollar, fund recurring bills, and auto-save spare change with round-ups. Connected bank accounts sync automatically through a dedicated banking engine built with Hono on Cloudflare Workers that normalizes Plaid data behind a provider-agnostic API, while Supabase handles auth, row-level security, and edge functions for transaction syncing and scheduled funding. Trends and charts break spending down by category and month, with Face ID lock, push notifications, and CSV export rounding out the experience.",
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Plaid",
      "Hono",
      "Cloudflare Workers",
      "NativeWind",
      "Turborepo",
    ],
    year: "2026",
    color: "#101c26",
    role: "Architect / Sole Developer",
    duration: "Personal project",
    highlights: [
      "Envelope-style bucket budgeting with scheduled funding and automatic round-up savings",
      "Standalone banking engine on Cloudflare Workers that normalizes Plaid accounts and transactions behind a provider-agnostic API",
      "Supabase backend with row-level security and edge functions for background transaction sync",
      "Spending trends and category breakdowns, Face ID lock, push notifications, and CSV export",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/flux-promo.mp4#t=0.5",
        alt: "Flux mobile budgeting app product demo",
        caption: "Flux in action — organize every dollar, track spending, and stay on plan.",
        aspectRatio: "full-width",
      },
      {
        type: "image",
        src: "/images/projects/flux-overview.jpg",
        alt: "Flux overview screen with safe-to-spend, monthly snapshot cards, and recent Plaid-synced transactions",
        caption: "The overview — safe-to-spend, monthly snapshot, and live transactions from Plaid.",
        aspectRatio: "portrait",
      },
      {
        type: "image",
        src: "/images/projects/flux-buckets.jpg",
        alt: "Flux buckets screen showing envelope budgets with funding progress and a fund-all button",
        caption: "Bucket budgeting — assign every dollar and fund every envelope in one tap.",
        aspectRatio: "portrait",
      },
      {
        type: "image",
        src: "/images/projects/flux-transactions.jpg",
        alt: "Flux transaction feed grouped by day with categorized merchants and daily totals",
        caption: "The transaction feed — synced automatically, categorized, and searchable.",
        aspectRatio: "portrait",
      },
    ],
  },
  {
    id: "analytics-dashboards",
    title: "Henry Media Dashboard",
    category: "Web Application",
    description:
      "Client-facing analytics platform with AI-assisted reporting on top of BigQuery.",
    fullDescription:
      "A multi-tenant analytics dashboard platform that turns raw marketing and campaign data into client-ready reporting. Next.js 16 on the front, Drizzle ORM over PostgreSQL for application data, BigQuery for the warehouse, and a background worker for scheduled syncs. An integrated AI layer built on the Claude API and Model Context Protocol lets users interrogate their data conversationally, and dashboards export to shareable PDFs for client delivery.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "BigQuery",
      "Claude API",
      "MCP",
      "Recharts",
      "Upstash Redis",
    ],
    year: "2026",
    color: "#16213e",
    role: "Architect / Sole Developer",
    duration: "Ongoing",
    client: "Idea Ranch",
    highlights: [
      "Multi-source data pipeline syncing campaign data into BigQuery with a dedicated worker process",
      "Conversational AI reporting built on the Claude API and Model Context Protocol",
      "Interactive visualizations with Recharts and d3-geo, exportable to client-ready PDFs",
      "Typed end to end with Drizzle ORM, Biome, and Vitest across the stack",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/henry-promo.mp4#t=0.5",
        alt: "Henry product walkthrough",
        caption: "A walkthrough of Henry in action.",
      },
      {
        type: "image",
        src: "/images/projects/henry-kpis.jpg",
        alt: "Live KPI cards showing blended spend, ROAS, and reach with week-over-week deltas",
        caption: "Every number live — blended spend, ROAS, and reach with week-over-week deltas.",
      },
      {
        type: "image",
        src: "/images/projects/henry-campaigns.jpg",
        alt: "Campaign table ranking spend and ROAS across Meta, Google, and TikTok",
        caption: "Campaigns ranked live across channels, with scaling and fatigue signals.",
      },
      {
        type: "image",
        src: "/images/projects/henry-ask.jpg",
        alt: "Ask Henry conversational AI answering why ROAS dipped on Meta",
        caption: "Conversational reporting — ask the data a question, get an answer with the why.",
      },
    ],
  },
  {
    id: "scanline",
    title: "Scanline",
    category: "SaaS Product",
    description:
      "Self-hosted QR code platform with dynamic codes, design studio, and per-scan analytics.",
    fullDescription:
      "Scanline is a self-hosted replacement for commercial QR code services: static and dynamic codes across 19 content types, a full design studio, hosted landing pages, and per-scan analytics with no third-party calls. Dynamic codes route through short links that can be edited, paused, expired, or capped after printing, with scans broken down by country, city, device, OS, and browser via offline GeoIP. It ships with custom domain support, a bearer-token public API with batch creation, and print-ready exports in PNG, SVG, PDF, and EPS.",
    tech: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "Prisma",
      "PostgreSQL",
      "Recharts",
      "Railway",
    ],
    year: "2026",
    color: "#0f2419",
    role: "Architect / Sole Developer",
    duration: "Personal project",
    highlights: [
      "19 content types including hosted dynamic pages for vCards, events, galleries, audio, and coupons",
      "Per-scan analytics — unique scans, geography, device, OS, browser — with fully offline GeoIP",
      "Design studio with gradients, dot styles, logo knockout, printable frames, and reusable templates",
      "Custom short-link domains with in-app verification, plus a public API with batch creation",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/scanline-promo.mp4#t=0.5",
        alt: "Scanline product walkthrough",
        caption: "A walkthrough of Scanline in action.",
      },
      {
        type: "image",
        src: "/images/projects/scanline-codes.jpg",
        alt: "Scanline codes dashboard with scan totals, folders, and per-code scan counts",
        caption: "The codes dashboard — folders, filters, and live scan counts for every printed code.",
      },
      {
        type: "image",
        src: "/images/projects/scanline-new-code.png",
        alt: "Scanline new-code screen listing the supported QR content types",
        caption: "Creating a new code — websites, vCards, WiFi, galleries, coupons, and more.",
      },
      {
        type: "image",
        src: "/images/projects/scanline-studio.png",
        alt: "Scanline design studio with gradient colors, module styles, and live QR preview",
        caption: "The design studio — gradients, dot styles, frames, and reusable templates with a live preview.",
      },
      {
        type: "image",
        src: "/images/projects/scanline-analytics.jpg",
        alt: "Per-scan analytics with scans over time, countries, cities, devices, OS, and browsers",
        caption: "Per-scan analytics — geography, device, OS, and browser breakdowns via fully offline GeoIP.",
        aspectRatio: "square",
      },
      {
        type: "image",
        src: "/images/projects/scanline-landing.jpg",
        alt: "Hosted vCard landing page rendered from a dynamic QR code",
        caption: "A hosted dynamic page — scan a vCard code and save the contact straight to your phone.",
        aspectRatio: "portrait",
      },
    ],
  },
  {
    id: "faunter",
    title: "Faunter",
    category: "Desktop App",
    description:
      "Cross-platform desktop app that syncs and installs fonts across a whole design team.",
    fullDescription:
      "Faunter solves a real agency problem: keeping every designer's machine loaded with the same fonts. It's a Tauri desktop app for macOS and Windows with a Rust backend that installs fonts system-wide (handling OS elevation), synced in real time from a central Supabase-backed repository. Admins upload and manage the font library; team members just stay in sync automatically. It also integrates the Google Fonts library and Adobe Fonts catalog for browsing and adding fonts directly.",
    tech: [
      "Tauri 2",
      "Rust",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Zustand",
    ],
    year: "2026",
    color: "#1f1a2e",
    role: "Architect / Sole Developer",
    duration: "5 months",
    highlights: [
      "Real-time font sync to every team member's workstation via Supabase Realtime",
      "System-wide font installation on macOS and Windows, including OS permission elevation in Rust",
      "Role-based access — admins manage the library, members sync automatically",
      "Google Fonts and Adobe Fonts integration for browsing and adding fonts in-app",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/faunter-promo.mp4#t=0.5",
        alt: "Faunter product walkthrough",
        caption: "A walkthrough of Faunter in action.",
        aspectRatio: "full-width",
      },
      {
        type: "image",
        src: "/images/projects/faunter-library-live.jpg",
        alt: "Faunter font library with per-font activation toggles and Google Fonts and Adobe sources",
        caption: "The synced library — toggle any font on or off and it installs system-wide instantly.",
        aspectRatio: "square",
      },
      {
        type: "image",
        src: "/images/projects/faunter-adobe.jpg",
        alt: "Faunter Adobe Fonts search detecting Aktiv Grotesk for direct install",
        caption: "Adobe Fonts integration — search the catalog and pull fonts straight into the team library.",
        aspectRatio: "square",
      },
    ],
  },
  {
    id: "idea-ranch",
    title: "Idea Ranch 2.0",
    category: "Agency Website",
    description:
      "The creative agency's own site, rebuilt on Next.js and Payload CMS.",
    fullDescription:
      "A ground-up rebuild of Idea Ranch's agency website on Next.js with Payload CMS and PostgreSQL, giving the creative team full control of content while keeping the front end fast and expressive. The build runs on Bun and includes database schema caching to keep CMS startup times snappy. Alongside the main site, I shipped a branded team-onboarding app with file uploads and automated email notifications via Resend.",
    tech: [
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "PostgreSQL",
      "Tailwind CSS",
      "Bun",
      "Resend",
    ],
    year: "2025",
    color: "#241a10",
    role: "Architect / Sole Developer",
    duration: "Ongoing",
    client: "Idea Ranch",
    liveUrl: "https://idearanch.com",
    highlights: [
      "Full content model in Payload CMS so the creative team owns every page without deploys",
      "Database schema caching to cut CMS startup time during development and deploys",
      "Branded onboarding app for new hires with uploads and Resend email automation",
      "Runs on Bun end to end, from local development through production builds",
    ],
    media: [
      {
        type: "video",
        src: "/videos/projects/idea-ranch-promo.mp4#t=0.75",
        alt: "Idea Ranch 2.0 site walkthrough",
        caption: "A walkthrough of the live Idea Ranch site.",
        aspectRatio: "full-width",
      },
      {
        type: "image",
        src: "/images/projects/idearanch-home.jpg",
        alt: "Idea Ranch homepage hero with full-bleed brand film",
        caption: "The homepage — full-bleed brand film under the Idea Ranch masthead.",
      },
      {
        type: "image",
        src: "/images/projects/idearanch-work-grid.jpg",
        alt: "Idea Ranch work page with capability filters for video, photography, copywriting, and web",
        caption: "The work page — case studies filterable by capability, all driven by Payload CMS.",
      },
      {
        type: "image",
        src: "/images/projects/idea-ranch-work.jpg",
        alt: "Idea Ranch work section showing the Carhartt case study",
        caption: "Case-study tiles on the live site, all managed through Payload CMS.",
      },
      {
        type: "image",
        src: "/images/projects/idearanch-carhartt.jpg",
        alt: "Carhartt case-study page hero on the Idea Ranch site",
        caption: "A case-study detail page — hero film, credits, and content blocks composed in the CMS.",
      },
    ],
  },
];
