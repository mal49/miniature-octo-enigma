import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
