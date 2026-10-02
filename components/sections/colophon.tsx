import { Reveal } from "@/components/reveal";
import { contactLinks, site } from "@/data/content";

export function Colophon() {
  return (
    <section id="contact" className="rule-b">
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
    </section>
  );
}
