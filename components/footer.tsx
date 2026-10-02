import Link from "next/link";
import { site } from "@/data/content";
import { policies } from "@/data/policies";

export function Footer() {
  return (
    <footer className="bg-[var(--paper)]">
      {/* Business details and policies on every page: CHIP's merchant review
          requires them to be visible on the live site. Raised above the
          wordmark below: its glyph box overflows its 0.8 line-height upward
          and would otherwise swallow clicks on these links. */}
      <div className="t-label relative z-[1] flex flex-col gap-[14px] p-[var(--gutter)] md:flex-row md:items-end md:justify-between">
        <address className="flex flex-col gap-[4px] not-italic">
          <span>
            {site.fullName} &middot; {site.entity}
          </span>
          <span>{site.address}</span>
          <span>
            <a href={`mailto:${site.email}`} className="hov tap">
              {site.email}
            </a>{" "}
            &middot;{" "}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hov tap">
              {site.phone}
            </a>
          </span>
        </address>

        <nav aria-label="Policies" className="flex flex-wrap gap-x-[14px] gap-y-[4px]">
          {policies.map((p) => (
            <Link key={p.slug} href={`/policies/${p.slug}`} className="hov tap">
              {p.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Closing wordmark. Sized in vw rather than rem so it stays bled to
          both gutters at every width — the point is the line filling the page,
          which a fixed scale only manages at one viewport.

          Deliberately not a Reveal: this is the last element in the document,
          so its top never climbs past the 85%-of-viewport trigger line, and a
          masked reveal here stays hidden forever. */}
      <p className="whitespace-nowrap px-[var(--gutter)] pb-[var(--gutter)] text-[11.4vw] font-medium leading-[0.8] tracking-[-0.04em]">
        {site.fullName}
        {/* Inline, so it sits on the wordmark's baseline. Sized in vw like the
            wordmark, or it stops fitting the row as the viewport narrows; on a
            phone that size is unreadable, so it is dropped there. */}
        <span className="ml-[0.5vw] hidden text-[1.1vw] font-normal tracking-normal md:inline">
          &copy; {new Date().getFullYear()}
        </span>
      </p>
    </footer>
  );
}
