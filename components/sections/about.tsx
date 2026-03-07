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
        <div className="flex border-2 border-black overflow-hidden">
          {QUICK_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`flex-1 flex items-center justify-between px-5 py-4 group hover:bg-black hover:text-white transition-colors duration-150 ${
                i < QUICK_LINKS.length - 1 ? "border-r-2 border-black" : ""
              }`}
            >
              <span className="font-semibold text-sm">{link.label}</span>
              <span className="text-xl leading-none font-bold">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
