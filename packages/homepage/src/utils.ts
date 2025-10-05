/** Returns URL with feature SVG */
export function getFeatureURL(
  type: "responsive" | "static", 
  name: string, 
  theme: "adaptive" | "light" | "dark" = "adaptive"
) {
  const url = new URL(window.location.toString());

  const basePath = url.pathname.replace(/\/$/, "");
  url.pathname = `${basePath}/features/${name}/${type}-${theme}.svg`;

  return url.toString();
}

/** Returns alt text for specified feature */
export function getFeatureAlt(label: string) {
  return `Baseline Status: ${label}`;
}

/** Returns webstatus.dev feature link URL */
export function getFeatureLink(featureId: string) {
  return `https://webstatus.dev/features/${featureId}`;
}
