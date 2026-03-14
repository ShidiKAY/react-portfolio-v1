/** Single source of truth for project IDs and their display order (home + project detail prev/next). */
export const PROJECT_ORDER = [
  "bbg",
  "freelance",
  "hml",
  "scf",
  "bubo",
  "hopps",
  "apigem",
];

export function isValidProjectId(projectId) {
  return typeof projectId === "string" && PROJECT_ORDER.includes(projectId);
}
