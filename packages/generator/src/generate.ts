import path from "node:path";
import { rmdir, mkdir } from "node:fs/promises";
import { features } from "web-features";
import { Browser } from "./browser";
import { logger } from "./logger";
import { createHTML } from "./html";
import { parseFeature } from "./parser";
import { htmlToSvg } from "./svg";
import { baselineStatusVersion } from "./constants";

const mainLogger = logger.scope("main");

const outdir = path.resolve(__dirname, "../../../features");
const outdirResponsive = path.resolve(outdir, "./responsive");
const outdirStatic = path.resolve(outdir, "./static");

// Clean up existing files
mainLogger.info("Cleaning up existing feature files...");
await rmdir(outdir, { recursive: true }).catch(() => {});
await mkdir(outdirResponsive, { recursive: true });
await mkdir(outdirStatic, { recursive: true });

const featureIds = Object.keys(features);
const page = await Browser.createPageWithContent(createHTML(featureIds));

// Main processing
mainLogger.info(`Generating ${featureIds.length} features...`);
for (const featureId of featureIds) {
  const scopedLogger = logger.scope(featureId);
  scopedLogger.info(`Generating "${featureId}"`);

  scopedLogger.info("Parsing HTML");
  const result = await parseFeature(featureId, page);

  scopedLogger.info("Creating responsive SVG file");
  const filename = `${featureId}.svg`;
  await Bun.write(
    path.resolve(outdirResponsive, filename),
    htmlToSvg(result.html)
  );

  scopedLogger.info("Creating static SVG file");
  await Bun.write(
    path.resolve(outdirStatic, filename),
    htmlToSvg(result.html, result.size.width, result.size.height)
  );
}

mainLogger.info("Writing manifest");
await Bun.write(
  path.resolve(outdir, "manifest.json"),
  JSON.stringify({ baselineStatusVersion, featureIds })
);

await Browser.destroy();
mainLogger.success("Completed!");
