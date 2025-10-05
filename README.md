# Baseline Widget

https://baseline.js.org

Embeddable SVG widgets for displaying [Baseline](https://web.dev/baseline/) status of web platform features. This service generates adaptive, responsive, and static SVG widgets with multiple theme options that can be embedded in documentation, blog posts, and README files.

## Widget Types

The service now generates 6 variants for each feature, combining three themes with two sizing options:

### Themes

- **Adaptive** — Automatically adapts to the user's system theme (light/dark)
- **Light** — Fixed light theme
- **Dark** — Fixed dark theme

### Sizing Options

- **Responsive** — Adapts to container size
- **Static** — Fixed dimensions

### URL Structure

Widgets are organized by feature ID with the following naming convention:

- `https://baseline.js.org/features/{feature-id}/responsive-adaptive.svg`
- `https://baseline.js.org/features/{feature-id}/responsive-light.svg`
- `https://baseline.js.org/features/{feature-id}/responsive-dark.svg`
- `https://baseline.js.org/features/{feature-id}/static-adaptive.svg`
- `https://baseline.js.org/features/{feature-id}/static-light.svg`
- `https://baseline.js.org/features/{feature-id}/static-dark.svg`

## Data Sources

This project builds upon these open source initiatives:

- **[web-features](https://github.com/web-platform-dx/web-features)** — Comprehensive database of web platform features
- **[baseline-status](https://github.com/web-platform-dx/baseline-status)** — Web component for Baseline status display
- **[Web Platform Status](https://github.com/GoogleChrome/webstatus.dev/)** — Web platform feature database and status tracker
- **[Baseline](https://web.dev/baseline/)** — Web standards community initiative for identifying stable features

## License

MIT License - see the LICENSE file for details.
