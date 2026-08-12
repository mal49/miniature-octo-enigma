import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="bg-background py-16 border-b-2 border-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Services</h2>
        <p className="text-base text-muted-foreground max-w-lg mb-10 leading-relaxed">
          Neko Labz builds and looks after the web side of small businesses in
          Malaysia — design, build, payments, and the upkeep afterwards.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map(({ id, title, blurb, points, icon: Icon }) => (
            <div
              key={id}
              className="border-2 border-foreground bg-background p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="border-2 border-foreground p-2">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-xl font-bold leading-tight">{title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {blurb}
              </p>

              <ul className="flex flex-col gap-2 text-sm">
                {points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden className="text-muted-foreground">
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">
            Every project is quoted after a short call — no fixed packages.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground bg-foreground text-background px-5 py-3 text-sm font-bold hover:bg-background hover:text-foreground transition-colors duration-150"
          >
            Start a project
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
