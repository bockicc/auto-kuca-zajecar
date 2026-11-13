export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-overlay focus:rounded-sm focus:bg-accent focus:px-4 focus:py-3 focus:text-accent-contrast focus:shadow-overlay"
    >
      Preskoči na sadržaj
    </a>
  );
}
