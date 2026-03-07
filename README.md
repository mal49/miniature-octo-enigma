# Developer Portfolio

A modern, minimal developer portfolio built with **Next.js 16**, **TailwindCSS v4**, **shadcn/ui**, and **Framer Motion**.

## Features

- 🌗 Dark / light mode toggle (no flash on load)
- 🎞 Framer Motion entrance & hover animations (respects `prefers-reduced-motion`)
- 📱 Fully responsive, mobile-first layout
- 🔍 SEO metadata + Open Graph tags
- ♿ Accessible navigation with ARIA labels
- ⚡ Static export — fast loading on Vercel / Cloudflare

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx         # Root layout with metadata & theme script
│   ├── page.tsx           # Page — assembles all sections
│   └── globals.css        # Tailwind + shadcn CSS variables
├── components/
│   ├── nav.tsx            # Sticky navigation with mobile menu
│   ├── footer.tsx         # Footer with copyright
│   ├── theme-toggle.tsx   # Dark/light theme button
│   ├── motion-section.tsx # Framer Motion scroll wrapper
│   ├── sections/
│   │   ├── hero.tsx       # Hero section
│   │   ├── about.tsx      # About + skills
│   │   ├── projects.tsx   # Project cards
│   │   ├── tech-stack.tsx # Technology grid
│   │   └── contact.tsx    # Contact + social links
│   └── ui/                # shadcn/ui primitives (button, card, badge)
├── data/
│   └── projects.ts        # Project data — edit this to add projects
└── lib/
    └── utils.ts           # Utility helpers (cn)
```

## Personalizing

### 1. Update your name & tagline
Edit `components/sections/hero.tsx` — replace `"Your Name"` and update the tagline paragraph.

### 2. Add or edit projects
Open `data/projects.ts` and edit the `projects` array:

```ts
{
  id: "my-project",
  title: "My Project",
  description: "A short description of the project.",
  tech: ["Next.js", "TypeScript", "Postgres"],
  github: "https://github.com/yourusername/my-project",
  demo: "https://my-project.vercel.app",
  gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  featured: true, // shows "Featured" badge
}
```

### 3. Update contact info
Edit `components/sections/contact.tsx` — update `PLACEHOLDER_EMAIL` and the `socials` array with your real links.

### 4. Update metadata & Open Graph
Edit `app/layout.tsx` — update `metadataBase`, `title`, `description`, and Open Graph fields with your real domain.

### 5. Add an OG image
Place a `1200×630` PNG at `public/og-image.png` for social sharing previews.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App Router, SSG |
| [TailwindCSS v4](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | UI primitives |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev) | Icons |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
