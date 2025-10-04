export type Option = { label: string; value: string };

/** Returns searchable web features list */
export async function getSearchOptions() {
  const { features } = await import("web-features/data.json");

  const options: Option[] = Object.entries(features).map(([key, value]) => {
    return { value: key, label: "name" in value ? value.name : "unknown" };
  });

  return options;
}
