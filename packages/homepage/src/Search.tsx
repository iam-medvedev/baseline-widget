import { useState } from "react";
import Select from "react-select";
import { Highlight, themes } from "prism-react-renderer";
import { suspend } from "suspend-react";
import { getFeatureURL, getFeatureAlt } from "./utils";
import { type Option, getSearchOptions } from "./options";

function CodeExample({ option }: { option: Option }) {
  return (
    <>
      <h3>Embed Code</h3>
      <p>Copy this HTML to embed the widget in your project:</p>

      <h4>Recommended: Responsive Adaptive</h4>
      <p>Automatically adapts to your site's theme and layout:</p>
      <Highlight
        theme={themes.github}
        code={`<img src="${getFeatureURL("responsive", option.value, "adaptive")}" alt="${getFeatureAlt(option.label)}" style="width: 100%; height: auto;" />`}
        language="html"
      >
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

      <h4>All Available Options</h4>
      <Highlight
        theme={themes.github}
        code={`<!-- Responsive variants -->
<img src="${getFeatureURL("responsive", option.value, "adaptive")}" alt="${getFeatureAlt(option.label)}" style="width: 100%; height: auto;" />
<img src="${getFeatureURL("responsive", option.value, "light")}" alt="${getFeatureAlt(option.label)}" style="width: 100%; height: auto;" />
<img src="${getFeatureURL("responsive", option.value, "dark")}" alt="${getFeatureAlt(option.label)}" style="width: 100%; height: auto;" />

<!-- Static variants -->
<img src="${getFeatureURL("static", option.value, "adaptive")}" alt="${getFeatureAlt(option.label)}" />
<img src="${getFeatureURL("static", option.value, "light")}" alt="${getFeatureAlt(option.label)}" />
<img src="${getFeatureURL("static", option.value, "dark")}" alt="${getFeatureAlt(option.label)}" />`}
        language="html"
      >
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

      <p>Markdown (recommended):</p>
      <Highlight
        theme={themes.github}
        code={`![${getFeatureAlt(option.label)}](${getFeatureURL("responsive", option.value, "adaptive")})`}
        language="markdown"
      >
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

function Preview({ option }: { option: Option }) {
  return (
    <>
      <h3>Preview</h3>
      <p>This is how the adaptive widget will appear in your project:</p>
      <img
        alt={getFeatureAlt(option.label)}
        src={getFeatureURL("responsive", option.value, "adaptive")}
        style={{ width: "100%", height: "auto" }}
      />
    </>
  );
}

export function Search() {
  const options = suspend(getSearchOptions, []);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <>
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
          <Preview option={selectedOption} />
          <CodeExample option={selectedOption} />
        </>
      ) : null}
    </>
  );
}
