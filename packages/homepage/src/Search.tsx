import { useState } from "react";
import Select from "react-select";
import { Highlight, themes } from "prism-react-renderer";
import { suspend } from "suspend-react";
import { getFeatureURL, getFeatureAlt, getFeatureLink } from "./utils";
import { type Option, getSearchOptions } from "./options";

type WidgetSettings = {
  theme: "adaptive" | "light" | "dark";
  sizing: "responsive" | "static";
  format: "html" | "markdown";
  link: "with-link" | "without-link";
};

function WidgetForm({
  settings,
  onSettingsChange,
}: {
  settings: WidgetSettings;
  onSettingsChange: (settings: WidgetSettings) => void;
}) {
  return (
    <>
      <h4>Widget Settings</h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                theme: e.target.value as WidgetSettings["theme"],
              })
            }
          >
            <option value="adaptive">Adaptive</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label htmlFor="sizing">Sizing:</label>
          <select
            id="sizing"
            value={settings.sizing}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                sizing: e.target.value as WidgetSettings["sizing"],
              })
            }
          >
            <option value="static">Static</option>
            <option value="responsive">Responsive</option>
          </select>
        </div>

        <div>
          <label htmlFor="format">Output Format:</label>
          <select
            id="format"
            value={settings.format}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                format: e.target.value as WidgetSettings["format"],
              })
            }
          >
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        <div>
          <label htmlFor="link">Feature Link:</label>
          <select
            id="link"
            value={settings.link}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                link: e.target.value as WidgetSettings["link"],
              })
            }
          >
            <option value="without-link">Without Link</option>
            <option value="with-link">With Link</option>
          </select>
        </div>
      </div>
    </>
  );
}

function CodeExample({
  option,
  settings,
}: {
  option: Option;
  settings: WidgetSettings;
}) {
  const widgetURL = getFeatureURL(
    settings.sizing,
    option.value,
    settings.theme
  );
  const altText = getFeatureAlt(option.label);
  const featureLink = getFeatureLink(option.value);

  let htmlCode: string;
  let markdownCode: string;

  if (settings.link === "with-link") {
    htmlCode =
      settings.sizing === "responsive"
        ? `<a href="${featureLink}" target="_blank" rel="noopener noreferrer"><img src="${widgetURL}" alt="${altText}" style="width: 100%; height: auto;" /></a>`
        : `<a href="${featureLink}" target="_blank" rel="noopener noreferrer"><img src="${widgetURL}" alt="${altText}" /></a>`;

    markdownCode = `[![${altText}](${widgetURL})](${featureLink})`;
  } else {
    htmlCode =
      settings.sizing === "responsive"
        ? `<img src="${widgetURL}" alt="${altText}" style="width: 100%; height: auto;" />`
        : `<img src="${widgetURL}" alt="${altText}" />`;

    markdownCode = `![${altText}](${widgetURL})`;
  }

  const codeToShow = settings.format === "html" ? htmlCode : markdownCode;
  const language = settings.format === "html" ? "html" : "markdown";

  return (
    <>
      <h3>Generated Code</h3>
      <p>
        Copy this{" "}
        <code>
          <b>{settings.format}</b>
        </code>{" "}
        code to embed the widget:
      </p>
      <Highlight theme={themes.github} code={codeToShow} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </>
  );
}

function Preview({
  option,
  settings,
}: {
  option: Option;
  settings: WidgetSettings;
}) {
  const widgetURL = getFeatureURL(
    settings.sizing,
    option.value,
    settings.theme
  );
  const altText = getFeatureAlt(option.label);

  return (
    <>
      <h3>Preview</h3>
      <p>
        This is how the {settings.theme} {settings.sizing} widget will appear:
      </p>

      <div
        style={{
          backgroundColor: settings.theme === "dark" ? "#1a242f" : undefined,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <div
          style={
            settings.sizing === "responsive"
              ? {
                  resize: "both",
                  overflow: "auto",
                  border: "1px solid var(--links)",
                  minWidth: 100,
                  minHeight: 100,
                  maxWidth: "100%",
                  maxHeight: 400,
                  borderRadius: 8,
                }
              : {}
          }
        >
          <img
            alt={altText}
            src={widgetURL}
            style={
              settings.sizing === "responsive"
                ? { width: "100%", height: "100%" }
                : {}
            }
          />
        </div>
      </div>
    </>
  );
}

export function Search() {
  const options = suspend(getSearchOptions, []);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [settings, setSettings] = useState<WidgetSettings>({
    theme: "adaptive",
    sizing: "static",
    format: "html",
    link: "with-link",
  });

  return (
    <div
      style={{
        background: "var(--background-alt)",
        padding: 10,
        borderRadius: 6,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Find Your Feature</h2>
      <label htmlFor="name">
        Search for any web platform feature to get its embeddable widget:
      </label>

      <Select
        id="name"
        name="name"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="e.g. Grid, Flexbox, fetch..."
      />

      {selectedOption ? (
        <>
          <WidgetForm settings={settings} onSettingsChange={setSettings} />
          <hr />
          <Preview option={selectedOption} settings={settings} />
          <hr />
          <CodeExample option={selectedOption} settings={settings} />
        </>
      ) : null}
    </div>
  );
}
