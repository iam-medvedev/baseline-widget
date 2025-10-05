export type HTMLToSVGOptions = {
  width: number;
  height: number;
  theme: "dark" | "light" | "adaptive";
  responsive: boolean;
};

/** Converts HTML to SVG with optional dimensions */
export function htmlToSvg(htmlContent: string, options: HTMLToSVGOptions) {
  const widthAttr = `width="${options.width}"`;
  const heightAttr = `height="${options.height}"`;

  const sizesAttr = options.responsive ? "" : `${widthAttr} ${heightAttr}`;
  const themeAttr = `class="theme-${options.theme}"`;

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" ${themeAttr} ${sizesAttr}>
      <foreignObject width="100%" height="100%">
        <style>
          .theme-adaptive { color-scheme: light dark; }
          .theme-light { color-scheme: light; }
          .theme-dark { color-scheme: dark; }
        </style>
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${htmlContent}
        </div>
      </foreignObject>
    </svg>
  `;

  return svgContent;
}
