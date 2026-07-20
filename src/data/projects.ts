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
        type: "image",
        src: "/images/projects/dam-library.svg",
        alt: "Digital Asset Manager library view with AI-tagged asset grid",
        caption: "The library view — search, filters, and an AI-tagged asset grid syncing in realtime.",
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
    id: "alberta-boot-builder",
    title: "Alberta Boot Builder",
    category: "E-commerce",
    description:
      "Custom boot configurator built as an embedded Shopify app for a heritage bootmaker.",
    fullDescription:
      "A made-to-order boot configurator for Alberta Boot Co., built as an embedded Shopify app with Remix. Customers assemble their boot piece by piece — leathers, shafts, stitching, threads, toes, and heels — with live visual feedback, and the app generates the matching Shopify variants and order data for the workshop. The admin side, built with Shopify Polaris, lets the client manage materials, pricing, and option compatibility themselves, with Prisma/PostgreSQL persistence and S3-backed asset storage.",
    tech: [
      "Remix",
      "Shopify",
      "TypeScript",
      "Polaris",
      "Prisma",
      "PostgreSQL",
      "AWS S3",
      "GraphQL",
      "Fly.io",
    ],
    year: "2025",
    color: "#2b1d12",
    role: "Lead Developer",
    duration: "6 months",
    client: "Alberta Boot Co.",
    highlights: [
      "Built a multi-step visual configurator covering leathers, shafts, stitching, threads, toes, and heels",
      "Automated Shopify variant generation so custom builds flow straight into the standard order pipeline",
      "Self-serve admin for materials, pricing, and option-compatibility rules using Shopify Polaris",
      "CSV-driven catalog parity tooling to keep configurator options in sync with the workshop's offerings",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/boot-builder-materials.png",
        alt: "Boot Builder material selection step with an annotated boot showing shaft, heel, vamp, and pull tab",
        caption: "Material selection in the live configurator — every part of the boot is customizable.",
      },
      {
        type: "image",
        src: "/images/projects/boot-builder-selection.jpg",
        alt: "Hide and leather selection step offering standard and exotic leathers",
        caption: "Choosing between standard and exotic hides, step 3 of the 23-step build flow.",
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
