import { Project } from "@prisma/client";

export type IProjectSummary = {
  description: Project["description"];
  slug: Project["slug"];
  id: Project["id"];
  illustrationAlt: Project["illustrationAlt"];
  illustration: Project["illustration"];
};
