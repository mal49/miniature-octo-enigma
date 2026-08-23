import { Reveal } from "@/components/reveal";
import { statement } from "@/data/content";

/** Shown at every width: this holds the only "start a project" call to
 *  action on the page, so hiding it on phones dropped the conversion path. */
export function StatementBand() {
  return (
    <section className="rule-b">
      <div className="flex min-h-[50vh] md:min-h-[70vh] flex-col items-center justify-center gap-[43px] p-[var(--gutter)] text-center">
        {/* a-56: heading rides up 110% behind its mask, 900ms easeInOutCubic. */}
        <div className="mask">
          <Reveal variant="heading">
            <p className="t-display max-w-[16ch]">{statement.line}</p>
          </Reveal>
        </div>

        <a href={statement.cta.href} className="t-label tap">
          <span className="swap">
            <span className="swap-a">{statement.cta.label}</span>
            <span className="swap-b" aria-hidden>
              {statement.cta.label}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
