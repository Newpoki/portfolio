/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import {
  ClientOnly,
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import appCss from "../style.css?url";
import type { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { getLocale } from "@/i18n/paraglide/runtime.js";
import { Header } from "@/header/header";
import { getThemeServerFn } from "@/theme/theme";
import { getSession } from "@/auth/auth";
import { Toaster } from "@/ui/sonner";

type RootRouteContext = {
  queryClient: QueryClient;
};

const FONT_WEIGHTS = ["regular", "medium", "bold"];

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Jason Savelli",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...FONT_WEIGHTS.map((fontWeight) => ({
        // Avoid FOUT (font flickers) on initial load
        rel: "preload",
        href: `/fonts/sf-pro-display-${fontWeight}.woff2`,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const, // Required even if not cross-origin
      })),
    ],
  }),
  beforeLoad: async () => {
    const [theme, session] = await Promise.all([
      getThemeServerFn(),
      getSession(),
    ]);

    return { theme, session };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = Route.useRouteContext();

  return (
    <html className={theme} lang={getLocale()}>
      <head>
        <HeadContent />
      </head>

      <body>
        <main className="flex min-h-dvh flex-col">
          <Header />

          <div className="mx-auto flex w-full max-w-(--app-max-w) flex-1 flex-col main-layout-px">
            {children}
          </div>
        </main>

        <Toaster theme={theme} />

        <ClientOnly>
          <TanStackDevtools
            config={{
              defaultOpen: false,
            }}
            plugins={[
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
