import { Mail, Github, Linkedin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-muted border-b-2 border-foreground py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Start a project
        </h2>
        <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
          Tell me what you&apos;re building, roughly when you need it, and the
          budget you have in mind — I&apos;ll come back with a quote and a
          timeline.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:ikhmalhanif60@gmail.com"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground text-background px-5 py-3 text-sm font-bold hover:bg-background hover:text-foreground transition-colors duration-150">
            <Mail className="size-4" />
            ikhmalhanif60@gmail.com
          </a>

          <a
            href="https://wa.me/60128176934"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-150">
            <Phone className="size-4" />
            WhatsApp
          </a>

          <a
            href="https://github.com/mal49"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-150">
            <Github className="size-4" />
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/ikhmalhanif"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-150">
            <Linkedin className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
