import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/content";
import { ServiceList } from "@/components/sections/services";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Starting prices for websites, online stores, custom and AI-integrated systems, and maintenance from ${site.fullName}.`,
};

export default function Pricing() {
  return (
    <>
      <PageHeader />

      <main>
        <section className="rule-b p-[var(--gutter)] pb-[43px] pt-[43px]">
          <div className="mask mb-[14px]">
            <Reveal as="h1" variant="heading" className="t-display-sm">
              Pricing
            </Reveal>
          </div>
          <Reveal variant="fade" as="p" className="t-copy mb-[43px] max-w-[52ch]">
            Starting prices. Every project gets a fixed quote after a short call,
            once the scope is clear.
          </Reveal>

          <ServiceList />
        </section>
      </main>

      <Footer />
    </>
  );
}
