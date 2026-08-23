import { Reveal } from "@/components/reveal";
import { contactLinks, education, site } from "@/data/content";

export function Colophon() {
  return (
    <section id="contact" className="rule-b">
      <div className="grid grid-cols-1 md:grid-cols-[33%_1fr]">
        <div className="p-[var(--gutter)] pt-[43px] md:rule-r">
          <Reveal variant="fade" as="p" className="t-label mb-[14px]">
            Education
          </Reveal>
          {education.map((e) => (
            <Reveal key={e.degree} variant="item" className="rule-t py-[10px]">
              <div>{e.period}</div>
              <div className="t-accent">{e.degree}</div>
              <div>
                {e.institution}, {e.location}
                {e.gpa ? ` \u2014 CGPA ${e.gpa}` : ""}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="p-[var(--gutter)] pb-[43px] pt-[43px]">
          <Reveal variant="fade" as="p" className="t-label mb-[14px]">
            Contact
          </Reveal>

          <div className="mask">
            <Reveal variant="heading">
              <p className="t-display-sm mb-[14px] max-w-[18ch]">
                Tell me what you&apos;re building.
              </p>
            </Reveal>
          </div>

          <Reveal variant="block" className="mb-[14px]">
            <p className="t-copy max-w-[52ch]">
              A rough scope, when you need it and the budget you have in mind is
              enough to get a quote and a timeline back.
            </p>
          </Reveal>

          <Reveal variant="list" as="ul" className="flex flex-col gap-[14px] md:gap-[7px]">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="wipe tap"
                >
                  {l.label} &mdash; {l.value}
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal variant="fade" as="p" className="mt-[43px]">
            {site.entity}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
