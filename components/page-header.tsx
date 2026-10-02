import Link from "next/link";
import { site } from "@/data/content";

/** Slim bar for the pages off the homepage, which has its own nav in the hero. */
export function PageHeader() {
  return (
    <header className="rule-b flex items-center justify-between gap-[var(--gutter)] px-[var(--gutter)] py-[7px]">
      <Link href="/" className="t-label hov tap">
        {site.handle}
      </Link>
      <Link href="/#contact" className="t-label hov tap">
        [Get a quote]
      </Link>
    </header>
  );
}
