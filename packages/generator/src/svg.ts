/** Converts HTML to SVG with optional dimensions */
export function htmlToSvg(
  htmlContent: string,
  width?: number,
  height?: number
) {
  const widthString = width ? `width="${width}"` : "";
  const heightString = height ? `height="${height}"` : "";

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" ${widthString} ${heightString}>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${htmlContent}
        </div>
      </foreignObject>
    </svg>
  `;

  return svgContent;
}
