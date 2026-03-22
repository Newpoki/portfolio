import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "@/i18n/paraglide/server";

export default {
  fetch(req: Request): Promise<Response> {
    // Pass original `req` - NOT the modified `request` from callback
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};
