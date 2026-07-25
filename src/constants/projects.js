/** Single source of truth for project IDs and their display order (home + project detail prev/next). */
export const FLAGSHIP_PROJECT_ORDER = ["bbg", "freelance", "hml"];

export const EARLIER_PROJECT_ORDER = ["scf", "bubo", "hopps", "apigem"];

export const PROJECT_ORDER = [
  ...FLAGSHIP_PROJECT_ORDER,
  ...EARLIER_PROJECT_ORDER,
];

export function isValidProjectId(projectId) {
  return typeof projectId === "string" && PROJECT_ORDER.includes(projectId);
}
