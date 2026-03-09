import { projects } from "@/data/projects";

function BrowserCard({
  title,
  filename,
  image,
  description,
  link,
}: {
  title: string;
  filename: string;
  image?: string;
  description: string;
  link: string;
}) {
  return (
    <div className="border-2 border-black bg-white flex flex-col">
      {/* Browser-style header */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b-2 border-black bg-zinc-50">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-gray-500 flex-1 text-center pr-5 truncate">
          {filename}
        </span>
      </div>
      {/* Image */}
      <div className="h-44 bg-zinc-200 border-b-2 border-black overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-zinc-300 to-zinc-400" />
        )}
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <h3 className="text-xl font-bold leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center md:inline-block md:w-auto border-2 border-black px-6 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors duration-150">
          View project
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="dot-bg py-16 border-y-2 border-black">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-10">Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <BrowserCard
              key={project.id}
              title={project.title}
              filename={`${project.id}`}
              description={project.description}
              link={project.demo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
