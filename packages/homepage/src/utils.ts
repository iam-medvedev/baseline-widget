/** Returns URL with feature SVG */
export function getFeatureURL(type: "responsive" | "static", name: string) {
  const url = new URL(window.location.toString());

  const basePath = url.pathname.replace(/\/$/, "");
  url.pathname = `${basePath}/features/${type}/${name}.svg`;

  return url.toString();
}

/** Returns alt text for specified feature */
export function getFeatureAlt(label: string) {
  return `Baseline Status: ${label}`;
}
