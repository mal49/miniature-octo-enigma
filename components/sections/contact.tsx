import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-zinc-50 border-b-2 border-black py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Get in touch</h2>
        <p className="text-base text-gray-600 max-w-md mb-8 leading-relaxed">
          Have a project in mind or want to work together? I&apos;d love to hear
          from you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:ikhmalhanif60@gmail.com"
            className="inline-flex items-center gap-2 border-2 border-black bg-black text-white px-5 py-3 text-sm font-bold hover:bg-white hover:text-black transition-colors duration-150">
            <Mail className="size-4" />
            ikhmalhanif60@gmail
          </a>

          <a
            href="https://github.com/mal49"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-black px-5 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-150">
            <Github className="size-4" />
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/ikhmalhanif"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-black px-5 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-150">
            <Linkedin className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
