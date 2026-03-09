import { TechStackCarousel } from "@/components/sections/tech-stack-carousel";

const education = [
  {
    period: "2023 – current",
    type: "Undergraduate",
    degree: "Bachelor of Computer Science",
    institution: "Universiti Teknologi MARA (UiTM)",
    location: "Shah Alam, Malaysia",
    gpa: "3.78 / 4.00",
    highlights: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Database Systems",
      "Web Technologies",
    ],
  },
  {
    period: "2020 – 2023",
    type: "Diploma",
    degree: "Diploma in Electrical Engineering (Electronics)",
    institution: "Universiti Teknologi MARA (UiTM)",
    location: "Sarawak, Malaysia",
    gpa: "3.90 / 4.00",
    highlights: [
      "Programming Fundamentals",
      "System Analysis & Design",
      "Computer Networking",
    ],
  },
  {
    period: "2015 – 2019",
    type: "Secondary",
    degree: "Sijil Pelajaran Malaysia (SPM)",
    institution: "SMK Rancha-Rancha",
    location: "W.P. Labuan, Malaysia",
    gpa: undefined,
    highlights: ["Additional Mathematics", "Physics", "Information Technology"],
  },
];

type EduItem = (typeof education)[number];

function EduCard({ item }: { item: EduItem }) {
  return (
    <div className="border-2 border-black bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1 mb-2">
        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
          {item.type}
        </span>
        <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 whitespace-nowrap">
          {item.period}
        </span>
      </div>
      <h3 className="text-lg font-black leading-tight mb-1">{item.degree}</h3>
      <p className="text-sm font-semibold text-gray-700 mb-0.5">
        {item.institution}
      </p>
      <p className="text-xs text-gray-400 mb-3">{item.location}</p>
      {item.gpa && <p className="text-xs font-bold mb-3">GPA: {item.gpa}</p>}
      <div className="flex flex-wrap gap-1">
        {item.highlights.map((h) => (
          <span
            key={h}
            className="text-xs border border-black px-1.5 py-0.5 text-gray-600">
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="education" className="bg-white py-16 border-b-2 border-black">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-12">Education</h2>

        {/* ── Mobile: left-spine vertical stack ── */}
        <div className="md:hidden relative pl-6">
          {/* spine */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black" />

          <div className="space-y-6">
            {education.map((item, i) => (
              <div key={i} className="relative">
                {/* diamond node */}
                <div className="absolute -left-6.75 top-4 w-3 h-3 border-2 border-black bg-white rotate-45" />
                {/* horizontal connector */}
                <div className="absolute -left-3.75 top-5.25 w-4 h-0.5 bg-black" />

                <div className="border-2 border-black bg-white p-4">
                  {/* type + period row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-base font-black leading-tight mb-1">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-0.5">
                    {item.institution}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">{item.location}</p>

                  {item.gpa && (
                    <p className="text-xs font-bold mb-3">GPA: {item.gpa}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] border border-black px-2 py-0.5 text-gray-600">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop: fishbone alternating left / right ── */}
        <div className="hidden md:block relative">
          {/* vertical spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black -translate-x-px" />

          <div className="space-y-10">
            {education.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <div key={i} className="relative flex items-start">
                  {/* diamond node on spine */}
                  <div className="absolute left-1/2 top-6.5 w-4 h-4 border-2 border-black bg-white rotate-45 -translate-x-1/2 z-10" />

                  {isRight ? (
                    <>
                      <div className="w-1/2 pr-14" />
                      <div className="w-1/2 pl-14 relative">
                        <div className="absolute left-0 top-7 w-14 h-0.5 bg-black" />
                        <EduCard item={item} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-14 relative">
                        <div className="absolute right-0 top-7 w-14 h-0.5 bg-black" />
                        <EduCard item={item} />
                      </div>
                      <div className="w-1/2 pl-14" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack Carousel — full-width, outside max-w container */}
      <TechStackCarousel />
    </section>
  );
}
