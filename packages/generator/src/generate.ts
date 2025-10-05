import path from "node:path";
import { rmdir, mkdir } from "node:fs/promises";
import { features } from "web-features";
import { Browser } from "./browser";
import { logger } from "./logger";
import { createHTML } from "./html";
import { parseFeature } from "./parser";
import { htmlToSvg, type HTMLToSVGOptions } from "./svg";
import { baselineStatusVersion } from "./constants";

const mainLogger = logger.scope("main");
const outdir = path.resolve(__dirname, "../../../features");

// Clean up existing files
mainLogger.info("Cleaning up existing feature files...");
await rmdir(outdir, { recursive: true }).catch(() => {});

const featureIds = Object.keys(features);
const page = await Browser.createPageWithContent(createHTML(featureIds));

/** A list of files to generate */
const filesToGenerate: Omit<HTMLToSVGOptions, "width" | "height">[] = [
  { theme: "adaptive", responsive: false },
  { theme: "adaptive", responsive: true },
  { theme: "dark", responsive: false },
  { theme: "dark", responsive: true },
  { theme: "light", responsive: false },
  { theme: "light", responsive: true },
];

// Main processing
mainLogger.info(`Generating ${featureIds.length} features...`);
for (const featureId of featureIds) {
  const scopedLogger = logger.scope(featureId);
  scopedLogger.info(`Generating "${featureId}"`);

  scopedLogger.info("Parsing HTML");
  const result = await parseFeature(featureId, page);

  scopedLogger.info("Creating files");
  const fileOutdir = path.resolve(outdir, featureId);
  await mkdir(fileOutdir, { recursive: true });

  for (const options of filesToGenerate) {
    const filename = `${options.responsive ? "responsive" : "static"}-${options.theme}.svg`;
    scopedLogger.info(`Generating ${featureId}/${filename}`);
    await Bun.write(
      path.resolve(fileOutdir, filename),
      htmlToSvg(result.html, {
        ...result.size,
        ...options,
      })
    );
  }
}

mainLogger.info("Writing manifest");
await Bun.write(
  path.resolve(outdir, "manifest.json"),
  JSON.stringify({ baselineStatusVersion, featureIds })
);

await Browser.destroy();
mainLogger.success("Completed!");
