import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { stageItems } from "@/data/content";

export function ProjectGrid() {
  return (
    <section id="work" aria-labelledby="work-title" className="rule-b">
      <div className="p-[var(--gutter)] pb-[43px] pt-[43px]">
        <div className="mask mb-[28px]">
          <Reveal as="h2" id="work-title" variant="heading" className="t-display-sm">
            Projects
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-[43px] md:grid-cols-2 lg:grid-cols-3">
          {stageItems.map((p) => (
            <Reveal as="li" key={p.index} variant="list">
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--ink-alt)]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-[7px] flex items-baseline justify-between gap-[7px]">
                  <span className="truncate">{p.name}</span>
                  <span className="shrink-0 tabular-nums">[{p.index}]</span>
                </div>
                <p className="t-label mt-[4px] opacity-60">{p.featured}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
