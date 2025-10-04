import { Suspense } from "react";
import { Search } from "./Search";
import { getFeatureURL } from "./utils";

export function App() {
  return (
    <main>
      <h1>Baseline Status Widgets</h1>

      <p>
        Embeddable SVG widgets showing{" "}
        <a href="https://web.dev/baseline/" target="_blank">
          Baseline
        </a>{" "}
        status for web platform features. Simply copy the embed code and add it
        to your documentation, blog posts, or project README files.
      </p>

      <p>
        This service covers all features from the{" "}
        <a
          href="https://github.com/web-platform-dx/web-features"
          target="_blank"
        >
          <code>web-features</code>
        </a>{" "}
        repository.
      </p>

      <hr />
      <h2>Find Your Feature</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Search />
      </Suspense>
      <hr />

      <h2>Widget Options</h2>
      <p>Choose between two widget styles:</p>

      <h4>Responsive (Recommended)</h4>
      <p>Adapts to your site's theme and layout</p>
      <code>{getFeatureURL("responsive", "_FEATURE_")}</code>

      <h4>Static</h4>
      <p>Fixed styling, always looks the same</p>
      <code>{getFeatureURL("static", "_FEATURE_")}</code>

      <hr />

      <h2>Acknowledgments</h2>
      <p>This service is built on top of several open source projects:</p>
      <ul>
        <li>
          <strong>
            <a
              href="https://web-platform-dx.github.io/web-features/"
              target="_blank"
            >
              <code>web-features</code>
            </a>
          </strong>{" "}
          — A common list of web features and their definitions
        </li>
        <li>
          <strong>
            <a
              href="https://github.com/web-platform-dx/baseline-status"
              target="_blank"
            >
              <code>baseline-status</code>
            </a>
          </strong>{" "}
          — Web component for displaying Baseline status information
        </li>
        <li>
          <strong>
            <a href="https://web.dev/baseline/" target="_blank">
              Baseline
            </a>
          </strong>{" "}
          — Initiative by the web standards community to identify stable web
          features
        </li>
      </ul>

      <footer>
        <p>
          <small>
            <a
              href="https://github.com/iam-medvedev/baseline-widget"
              target="_blank"
            >
              View source on GitHub
            </a>{" "}
            • Licensed under MIT License • Data from{" "}
            <a
              href="https://github.com/web-platform-dx/web-features"
              target="_blank"
            >
              <code>web-features</code>
            </a>{" "}
            (Apache 2.0) <a href="#">Back to top ⬆</a>
          </small>
        </p>
      </footer>
    </main>
  );
}
