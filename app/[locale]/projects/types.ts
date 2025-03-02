import { Project } from "@prisma/client";

export type ProjectSummaryData = Pick<
  Project,
  "slug" | "id" | "illustrationAlt" | "illustration"
>;
