import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "@/styles.css?url";
import { BackToTop, Footer, Header, SkipToContent } from "@/components/layout";
import { ToastProvider } from "@/components/ui/toast";
import { FormDialogs } from "@/features/forms";
import { CookieConsentBanner, CookiePreferencesDialog, ConsentProvider } from "@/features/legal";
import { SearchDialog } from "@/features/search";
import { ThemeProvider } from "@/features/theme";
import { UiStateProvider, useUiState } from "@/features/ui-state";
import { siteConfig } from "@/lib/constants";
import { absoluteUrl, buildSeo, toMetaTags, withBasePath } from "@/lib/seo";

export const Route = createRootRoute({
  component: RootLayout,
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: toMetaTags(
      buildSeo({
        title: siteConfig.defaultTitle,
        description: siteConfig.defaultDescription,
        path: "/",
      }),
    ),
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: absoluteUrl("/") },
    ],
  }),
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={withBasePath("/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={withBasePath("/favicon-16x16.png")}
        />
        <link rel="icon" href={withBasePath("/favicon.ico")} sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={withBasePath("/apple-touch-icon.png")}
        />
        <meta name="theme-color" content={siteConfig.themeColor} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ConsentProvider>
          <UiStateProvider>
            <Shell />
          </UiStateProvider>
        </ConsentProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

function Shell() {
  const { isSearchOpen, closeSearch } = useUiState();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SkipToContent />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <SearchDialog open={isSearchOpen} onClose={closeSearch} />
      <FormDialogs />
      <CookieConsentBanner />
      <CookiePreferencesDialog />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Greška 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Stranica nije pronađena</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Link je možda zastareo ili je stranica premeštena. Vratite se na početnu ili pogledajte
        aktuelnu ponudu vozila.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-5 text-sm font-medium text-accent-contrast hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Početna
        </Link>
        <Link
          to="/vozila"
          className="inline-flex h-11 items-center justify-center rounded-sm border border-border bg-surface px-5 text-sm font-medium hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Ponuda vozila
        </Link>
      </div>
    </div>
  );
}
