/** Localized copy for a lab entry (content lives in labs.items.{id} translation keys). */
export function getLabContent(t, labId) {
  const prefix = `labs.items.${labId}`;
  return {
    title: t(`${prefix}.title`),
    problem: t(`${prefix}.problem`),
    approach: t(`${prefix}.approach`),
    result: t(`${prefix}.result`, { defaultValue: "" }),
  };
}
