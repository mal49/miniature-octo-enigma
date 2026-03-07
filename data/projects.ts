export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image?: string;
  gradient: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "camera-rental",
    title: "Awapixie Camera Rental Service",
    description:
      "A full-stack e-commerce solution with real-time inventory management, Stripe payments, and a powerful admin dashboard built for scale.",
    tech: ["React", "TypeScript", "SQLite", "Cloudflare", "TailwindCSS"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://awapixie.com",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    featured: true,
  },
  {
    id: "confession-app",
    title: "ceritaAnon A Confession Platform",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop Kanban boards, and dedicated team workspaces.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "TailwindCSS"],
    github: "https://github.com/mal49/confession-app",
    demo: "https://ceritaAnon.xyz",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    featured: true,
  },
  {
    id: "PWA",
    title: "HerDay a Menstrual Cycle Tracker App",
    description:
      "Modern blogging platform for developers with markdown support, syntax highlighting, and built-in SEO tools powered by Cloudflare.",
    tech: ["Next.js", "MDX", "Cloudflare", "TailwindCSS", "TypeScript"],
    github: "https://github.com/yourusername/devblog",
    demo: "https://herday.xyz",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  {
    id: "weather-app",
    title: "Simple Weather App",
    description:
      "Microservices API gateway with rate limiting, JWT authentication, distributed logging, and intelligent load balancing.",
    tech: ["Node.js", "Express", "Redis", "Docker", "TypeScript"],
    github: "https://github.com/mal49/simple-weather-app",
    demo: "https://simple-weather-app-sigma-nine.vercel.app/",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
];
