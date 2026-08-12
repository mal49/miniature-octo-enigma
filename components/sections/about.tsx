import { ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function About() {
  return (
    <section
      id="about"
      className="bg-background py-10 border-b-2 border-foreground"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-base max-w-xl mb-8 leading-relaxed">
          <span className="font-semibold">Neko Labz</span> is a one-person web
          studio in Kuala Lumpur, run by Ikhmal Hanif. I take small business
          projects end to end — design, build, payments, launch — and stay on
          afterwards to keep them running.
        </p>

        <p className="text-xs font-semibold text-muted-foreground mb-4 tracking-widest uppercase">
          Quick links
        </p>
        <div className="border-2 border-foreground overflow-hidden">
          <div className="grid grid-cols-2 md:flex">
            {QUICK_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={[
                  "flex-1 flex items-center justify-between px-3 sm:px-5 py-4 group hover:bg-foreground hover:text-background transition-colors duration-150",
                  i % 2 === 1 ? "border-l-2 border-foreground md:border-l-0" : "",
                  i >= 2 ? "border-t-2 border-foreground md:border-t-0" : "",
                  i < QUICK_LINKS.length - 1
                    ? "md:border-r-2 md:border-foreground"
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
