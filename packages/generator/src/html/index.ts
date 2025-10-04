import template from "./template.html" with { type: "text" };
import {
  componentName,
  featureAttrName,
  baselineStatusVersion,
} from "../constants";

/** Creates HTML with baseline status components */
export function createHTML(featureIds: string[]) {
  const content = featureIds
    .map(
      (featureId) =>
        `<${componentName} ${featureAttrName}="${featureId}"></${componentName}>`
    )
    .join("\n    ");

  return String(template)
    .replace("<!-- VERSION -->", baselineStatusVersion)
    .replace("<!-- CONTENT -->", content);
}
