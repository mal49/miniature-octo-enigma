export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-8">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-sm font-semibold">© {year} Ikhmal Hanif</span>
        <span className="text-sm text-zinc-400">All rights reserved</span>
      </div>
    </footer>
  );
}
