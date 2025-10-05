import { Suspense } from "react";
import { Search } from "./Search";

export function App() {
  return (
    <main>
      <h1>Baseline Status Widgets</h1>

      <p>
        Embeddable SVG widgets showing{" "}
        <a href="https://web.dev/baseline/" target="_blank">
          Baseline
        </a>{" "}
        status for web platform features. Supports adaptive theming, responsive
        sizing, and multiple theme options. Simply copy the embed code and add
        it to your documentation, blog posts, or project README files.
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
      <p>Each feature now has 6 variants combining themes and sizing:</p>

      <h4>Themes</h4>
      <ul>
        <li>
          <strong>Adaptive</strong> — Automatically adapts to system theme
          (recommended)
        </li>
        <li>
          <strong>Light</strong> — Fixed light theme
        </li>
        <li>
          <strong>Dark</strong> — Fixed dark theme
        </li>
      </ul>

      <h4>Sizing</h4>
      <ul>
        <li>
          <strong>Responsive</strong> — Adapts to container size
        </li>
        <li>
          <strong>Static</strong> — Fixed dimensions
        </li>
      </ul>

      <h4>URL Examples</h4>
      <p>Responsive Adaptive (recommended):</p>
      <code>
        https://baseline.js.org/features/<i>FEATURE</i>/responsive-adaptive.svg
      </code>

      <p>Static Light theme:</p>
      <code>
        https://baseline.js.org/features/<i>FEATURE</i>/static-light.svg
      </code>

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
