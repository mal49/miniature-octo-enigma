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

        {/* Right: Retro illustration */}
        <div className="flex-shrink-0 w-40 h-48 sm:w-52 sm:h-60 md:w-72 md:h-80">
          <RetroIllustration />
        </div>
      </div>
    </section>
  );
}

function RetroIllustration() {
  return (
    <svg
      viewBox="0 0 300 340"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* Computer body */}
      <rect x="55" y="78" width="170" height="168" rx="14" fill="#1a1a1a" />
      {/* Screen bezel */}
      <rect x="70" y="93" width="140" height="118" rx="6" fill="white" />
      {/* Large eye */}
      <circle cx="140" cy="152" r="37" fill="#1a1a1a" />
      <circle cx="140" cy="152" r="26" fill="white" />
      <circle cx="149" cy="144" r="11" fill="#1a1a1a" />
      <circle cx="153" cy="140" r="3.5" fill="white" />
      {/* Smile */}
      <path
        d="M 116 186 Q 140 204 164 186"
        stroke="#1a1a1a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Body dots */}
      <circle cx="108" cy="226" r="9" fill="white" />
      <circle cx="172" cy="226" r="9" fill="white" />
      {/* Stand */}
      <rect x="114" y="245" width="52" height="28" fill="#1a1a1a" />
      <rect x="86" y="270" width="108" height="12" rx="5" fill="#1a1a1a" />
      {/* Pen arm — rotated group */}
      <g transform="translate(214, 72) rotate(-28)">
        <rect x="-5" y="0" width="12" height="74" rx="3" fill="#1a1a1a" />
        <rect x="-5" y="72" width="12" height="9" fill="#888" />
        <polygon points="-5,81 7,81 1,97" fill="#444" />
        <rect x="-1" y="-5" width="4" height="8" rx="1" fill="#999" />
      </g>
      {/* Hand grip */}
      <ellipse cx="214" cy="148" rx="17" ry="13" fill="#1a1a1a" />
      {/* Arm from body */}
      <path
        d="M 218 108 C 236 124 233 142 218 152"
        stroke="#1a1a1a"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Decorative bubbles */}
      <circle cx="30" cy="70" r="13" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="52" cy="43" r="8" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="24" cy="45" r="5" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="274" cy="66" r="10" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="288" cy="94" r="5" fill="#1a1a1a" />
      <circle cx="22" cy="118" r="4.5" fill="#1a1a1a" />
    </svg>
  );
}
