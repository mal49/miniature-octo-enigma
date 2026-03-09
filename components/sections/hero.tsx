import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="bg-white border-b-2 border-black">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left: Text content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-black leading-[0.88] tracking-tight mb-7">
            Hello,
            <br />
            I&apos;m Ikhmal.
          </h1>
          <p className="text-base text-gray-600 max-w-sm mb-8 leading-relaxed">
            I&apos;m a full stack developer building modern web experiences.
            Made with love by{" "}
            <a
              href="#contact"
              className="font-bold text-black underline underline-offset-2">
              me!
            </a>
            .
          </p>
          <a
            href="#projects"
            className="block w-full text-center md:inline-block md:w-sm border-2 border-black px-6 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors duration-150">
            My Project!
          </a>
        </div>

        {/* Right: Cartoon illustration */}
        <div className="shrink-0 w-40 h-48 sm:w-52 sm:h-60 md:w-72 md:h-80">
          <Image
            src="/me-cartoon-pic.svg"
            alt="Ikhmal cartoon illustration"
            width={288}
            height={320}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
