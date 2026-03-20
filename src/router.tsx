import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { m } from "./paraglide/messages";
import { Separator } from "./components/ui/separator";
import { deLocalizeUrl, localizeUrl } from "@/paraglide/runtime.js";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultNotFoundComponent: DefaultNotFound,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

function DefaultNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      {/* Using grid instead of flex because Separator doesnt work within flex parent with item center */}
      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <h2>{m.not_found_code()}</h2>

        <Separator orientation="vertical" />
        <span>{m.not_found_content()}</span>
      </div>
    </div>
  );
}
