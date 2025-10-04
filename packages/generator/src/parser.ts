import type { Page } from "playwright";
import { componentName, featureAttrName } from "./constants";

/**
 * Parses <baseline-status> component with given feature
 * Returns HTML and sizes
 */
export async function parseFeature(featureId: string, page: Page) {
  const selector = `${componentName}[${featureAttrName}="${featureId}"]`;
  const result = await page.evaluate(
    async ({ selector }) => {
      const element = document.querySelector(selector);
      const shadowRoot = element?.shadowRoot;
      if (!shadowRoot) {
        throw new Error(`Cannot get <${selector}>`);
      }

      /** Returns style element with styles from ShadowDOM root */
      function getStyleElement(shadowRoot: ShadowRoot | null, name: string) {
        if (!shadowRoot) {
          return "";
        }

        // Parse styles content
        const content = Array.from(shadowRoot.adoptedStyleSheets)
          .map((sheet) =>
            Array.from(sheet.cssRules)
              .map((rule) => {
                if (rule.cssText.startsWith(":host")) {
                  return rule.cssText.replace(":host", name);
                }
                if (rule.cssText.startsWith("@")) {
                  return rule.cssText;
                }
                return `${name} ${rule.cssText}`;
              })
              .join("\n")
          )
          .join("\n");

        // Return <style> element
        const style = document.createElement("style");
        style.textContent = content;
        return style;
      }

      /**
       * ShadowDOM's root processor
       * Unwraps ShadowDOM and parses styles
       */
      function processShadowRoot(shadowRoot: ShadowRoot) {
        const parentElement = shadowRoot.host;
        // Handle children shadow roots
        shadowRoot.querySelectorAll("*").forEach((el) => {
          if (!el.shadowRoot) {
            return;
          }

          processShadowRoot(el.shadowRoot);
        });

        // Open details
        const details = shadowRoot.querySelector("details");
        if (details) {
          details.setAttribute("open", String(true));
          details.open = true;
        }

        // Unwrap content
        parentElement.innerHTML = shadowRoot.innerHTML;

        // Attach styles
        const style = getStyleElement(
          shadowRoot,
          parentElement.tagName.toLowerCase()
        );
        parentElement.prepend(style);
      }

      // Process ShadowDOM's root
      processShadowRoot(shadowRoot);

      // Remove links
      const links = element.querySelectorAll("a");
      links.forEach((link) => link.remove());

      // Add xmlns to all SVG elements
      const svgElements = element.querySelectorAll("svg");
      svgElements.forEach((svg) => {
        if (!svg.hasAttribute("xmlns")) {
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        }
      });

      // Remove open-icon
      element.querySelector(".open-icon")?.remove();

      // Return HTML and sizes
      const html = element.outerHTML;
      const rect = element.getBoundingClientRect();
      const size = {
        width: rect.width,
        height: rect.height,
      };

      return { html, size };
    },
    { selector }
  );

  return result;
}
