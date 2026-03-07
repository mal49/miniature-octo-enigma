"use client";

const row1 = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Framer Motion",
  "shadcn/ui",
  "REST API",
];

const row2 = [
  "Node.js",
  "Express",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Git",
  "GitHub",
  "Cloudflare",
  "Python",
  "C/C++",
];

function MarqueeRow({
  items,
  reverse = false,
  duration = "30s",
}: {
  items: string[];
  reverse?: boolean;
  duration?: string;
}) {
  // Quadruple to ensure no gaps at any viewport width
  const track = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}>
        {track.map((tech, i) => (
          <span
            key={i}
            className="border-2 border-black px-4 py-2 text-sm font-bold whitespace-nowrap bg-white hover:bg-black hover:text-white transition-colors duration-150 cursor-default select-none">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStackCarousel() {
  return (
    <div className="mt-16 md:mt-20 border-t-2 border-black pt-12">
      {/* Header */}
      <div className="flex justify-center gap-4 mb-8 px-6 max-w-5xl mx-auto">
        <div className="flex-1 h-0.5 bg-black mt-6" />
        <h2 className="text-4xl md:text-5xl font-black shrink-0">Tech Stack</h2>
        <div className="flex-1 h-0.5 bg-black mt-6" />
      </div>

      {/* Two rows scrolling in opposite directions */}
      <div className="space-y-3 pb-4">
        <MarqueeRow items={row1} reverse={false} duration="35s" />
        <MarqueeRow items={row2} reverse={true} duration="28s" />
      </div>
    </div>
  );
}
