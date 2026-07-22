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
    title: "Digital Asset Manager",
    category: "Platform",
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
    role: "Architect & Lead Developer",
    duration: "6+ months",
    client: "Idea Ranch",
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
        src: "/images/projects/dam-asset-detail.svg",
        alt: "Asset detail view showing AI enrichment panel and Adobe hand-off",
        caption: "Asset detail with the AI enrichment panel and one-click hand-off into Adobe apps.",
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
    role: "Solo Developer",
    duration: "Personal project",
    highlights: [
      "Envelope-style bucket budgeting with scheduled funding and automatic round-up savings",
      "Standalone banking engine on Cloudflare Workers that normalizes Plaid accounts and transactions behind a provider-agnostic API",
      "Supabase backend with row-level security and edge functions for background transaction sync",
      "Spending trends and category breakdowns, Face ID lock, push notifications, and CSV export",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/flux-buckets.svg",
        alt: "Flux buckets and overview screens showing envelope budgets and synced account balances",
        caption: "Buckets and overview — every dollar assigned, with balances synced from connected banks.",
      },
      {
        type: "image",
        src: "/images/projects/flux-trends.svg",
        alt: "Flux trends and transactions screens with spending charts and Plaid-synced transactions",
        caption: "Spending trends by category and the transaction feed, synced automatically via Plaid.",
      },
    ],
  },
  {
    id: "analytics-dashboards",
    title: "Analytics Dashboards",
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
    role: "Architect & Lead Developer",
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
        type: "image",
        src: "/images/projects/analytics-dashboard.png",
        alt: "Campaign performance dashboard with spend, clicks, and conversion stat tiles",
        caption: "A client dashboard — period-over-period stat tiles, PDF export, and the AI assistant.",
      },
      {
        type: "image",
        src: "/images/projects/analytics-charts.png",
        alt: "Spend and conversions trend chart with a campaign performance table",
        caption: "Trend charts and sortable campaign tables, synced from the warehouse.",
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
    role: "Solo Developer",
    duration: "Personal project",
    highlights: [
      "19 content types including hosted dynamic pages for vCards, events, galleries, audio, and coupons",
      "Per-scan analytics — unique scans, geography, device, OS, browser — with fully offline GeoIP",
      "Design studio with gradients, dot styles, logo knockout, printable frames, and reusable templates",
      "Custom short-link domains with in-app verification, plus a public API with batch creation",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/scanline-studio.png",
        alt: "Scanline design studio with module styles, colors, and live QR preview",
        caption: "The design studio — module styles, corner shapes, colors, and print-ready exports.",
      },
      {
        type: "image",
        src: "/images/projects/scanline-new-code.png",
        alt: "Scanline new-code screen listing the supported QR content types",
        caption: "Creating a new code — websites, vCards, WiFi, galleries, coupons, and more.",
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
    role: "Solo Developer",
    duration: "5 months",
    highlights: [
      "Real-time font sync to every team member's workstation via Supabase Realtime",
      "System-wide font installation on macOS and Windows, including OS permission elevation in Rust",
      "Role-based access — admins manage the library, members sync automatically",
      "Google Fonts and Adobe Fonts integration for browsing and adding fonts in-app",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/faunter-library.svg",
        alt: "Faunter desktop app showing the synced team font library",
        caption: "The team library — every font previewed, versioned, and synced to each machine.",
      },
      {
        type: "image",
        src: "/images/projects/faunter-team.svg",
        alt: "Faunter team view showing per-member sync status",
        caption: "Team sync status — admins see exactly which machines are up to date.",
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
    year: "2024",
    color: "#241a10",
    role: "Lead Developer",
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
        type: "image",
        src: "/images/projects/idea-ranch-home.jpg",
        alt: "Idea Ranch homepage with full-bleed brand film",
        caption: "The live homepage — full-bleed brand film, fast and fully content-managed.",
      },
      {
        type: "image",
        src: "/images/projects/idea-ranch-work.jpg",
        alt: "Idea Ranch work section showing the Carhartt case study",
        caption: "Case-study tiles on the live site, all managed through Payload CMS.",
      },
    ],
  },
];
