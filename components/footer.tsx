export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-foreground/10 bg-background text-muted-foreground py-8">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-sm font-semibold text-foreground">
            © {year} Ikhmal Hanif
          </span>
          <span className="text-xs">
            NEKO LABZ SOLUTIONS · SSM 202603210521 (IP0630481-A)
          </span>
        </div>
        <span className="text-sm">All rights reserved</span>
      </div>
    </footer>
  );
}
