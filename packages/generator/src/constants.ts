/** Baseline Status Component Name */
export const componentName = `baseline-status` as const;

/** Baseline Status Component Feature ID Attribute Name */
export const featureAttrName = `featureId` as const;

/** Baseline Status Component Version */
export const baselineStatusVersion = await import(
  "baseline-status/package.json"
).then((data) => data.version);
