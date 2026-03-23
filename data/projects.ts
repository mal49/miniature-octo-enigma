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
      "A modern camera rental platform built with a streamlined booking system, real-time availability management, and a responsive user experience for seamless gear reservations.",
    tech: ["React", "TypeScript", "SQLite", "Cloudflare", "TailwindCSS"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://awapixie.com",
    image: "/projects/new-hero.png",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    featured: true,
  },
  {
    id: "confession-app",
    title: "ceritaAnon A Confession Platform",
    description:
      "A full-stack anonymous confession platform with secure post submissions, automated moderation workflows, and a scalable architecture for handling community-driven content.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "TailwindCSS"],
    github: "https://github.com/mal49/confession-app",
    demo: "https://ceritaAnon.xyz",
    image: "/projects/cerita-Anon-sc.png",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    featured: true,
  },
  {
    id: "PWA",
    title: "HerDay a Menstrual Cycle Tracker App",
    description:
      "A Progressive Web App (PWA) menstrual cycle tracker that helps users monitor periods, predict cycles, and track symptoms with a fast, installable mobile-friendly experience.",
    tech: ["Next.js", "MDX", "Cloudflare", "TailwindCSS", "TypeScript"],
    github: "https://github.com/yourusername/devblog",
    demo: "https://herday.xyz",
    image: "/projects/Her-Day-conv-1.png",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  {
    id: "weather-app",
    title: "Simple Weather App",
    description:
      "A lightweight weather application that fetches real-time weather data via API, featuring location search and a responsive interface for quickly viewing current conditions and forecasts.",
    tech: ["Node.js", "Express", "Redis", "Docker", "TypeScript"],
    github: "https://github.com/mal49/simple-weather-app",
    demo: "https://simple-weather-app-sigma-nine.vercel.app/",
    image: "/projects/simple-weather-app.png",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
];
