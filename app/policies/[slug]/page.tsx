import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { policies } from "@/data/policies";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies.find((p) => p.slug === slug);
  return { title: policy?.title };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = policies.find((p) => p.slug === slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader />
      <main className="rule-b p-[var(--gutter)] pb-[86px] pt-[43px]">
        <h1 className="t-display-sm mb-[14px]">{policy.title}</h1>
        <p className="t-label mb-[43px]">Last updated {policy.updated}</p>

        <div className="max-w-[64ch]">
          {policy.sections.map((s) => (
            <section key={s.heading} className="rule-t py-[14px]">
              <h2 className="t-accent mb-[7px]">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="t-copy mb-[7px]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
