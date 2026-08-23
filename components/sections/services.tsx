import { Reveal } from "@/components/reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="index" className="rule-b">
      <div className="p-[var(--gutter)] pb-[43px] pt-[43px]">
        <Reveal variant="fade" className="t-label mb-[14px]" as="p">
          Index
        </Reveal>

        <ul>
          {services.map((s, i) => (
            <li key={s.id} className="relative py-[14px]">
              {/* a-58: the rule draws from the left over 1200ms. */}
              <Reveal
                variant="line"
                className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--ink)]"
              >
                <span className="sr-only" />
              </Reveal>

              <Reveal
                variant="item"
                className="grid grid-cols-[3rem_1fr] gap-[var(--gutter)] md:grid-cols-[3rem_18rem_1fr]"
              >
                <span>[0{i + 1}]</span>
                <span className="t-accent">{s.title}</span>
                <span className="t-copy col-span-2 md:col-span-1">
                  {s.blurb} {s.points.join(" \u00b7 ")}.
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
