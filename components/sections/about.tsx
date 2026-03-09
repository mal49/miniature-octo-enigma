import { ArrowUpRight } from "lucide-react";

ArrowUpRight;

const QUICK_LINKS = [
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function About() {
  return (
    <section id="about" className="bg-white py-10 border-b-2 border-black">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold text-gray-500 mb-4 tracking-widest uppercase">
          Quick links
        </p>
        <div className="border-2 border-black overflow-hidden">
          <div className="grid grid-cols-2 md:flex">
            {QUICK_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={[
                  "flex-1 flex items-center justify-between px-3 sm:px-5 py-4 group hover:bg-black hover:text-white transition-colors duration-150",
                  i % 2 === 1 ? "border-l-2 border-black md:border-l-0" : "",
                  i >= 2 ? "border-t-2 border-black md:border-t-0" : "",
                  i < QUICK_LINKS.length - 1
                    ? "md:border-r-2 md:border-black"
                    : "",
                ].join(" ")}>
                <span className="font-semibold text-sm">{link.label}</span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
