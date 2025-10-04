import { chromium, type Browser as BrowserInstance } from "playwright";
import { logger } from "./logger";

const scopedLogger = logger.scope("browser");

/** Reusable browser instance */
export class Browser {
  private static _instance: BrowserInstance | null = null;

  /** Returns/creates browser instance */
  public static async getInstance(): Promise<BrowserInstance> {
    if (!Browser._instance) {
      scopedLogger.info("Starting browser");
      Browser._instance = await chromium.launch({
        args: ["--disable-web-security"],
      });
    }
    return Browser._instance;
  }

  /** Destroys browser instance */
  public static async destroy() {
    scopedLogger.info("Destroying browser");
    const instance = await Browser.getInstance();
    Browser._instance = null;
    return instance.close();
  }

  /** Creates page with specified HTML content */
  public static async createPageWithContent(content: string) {
    const browser = await Browser.getInstance();
    const page = await browser.newPage();

    page.on("requestfinished", async (request) => {
      scopedLogger.info("Successful Request:", request.url());
    });
    page.on("requestfailed", (request) => {
      scopedLogger.error("Failed Request:", request.url(), request.failure());
    });

    await page.setContent(content, { waitUntil: "networkidle" });

    return page;
  }
}
