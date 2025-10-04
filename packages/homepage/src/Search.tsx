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
      <Highlight
        theme={themes.github}
        code={`<!-- Responsive -->
<img src="${getFeatureURL("responsive", option.value)}" alt="${getFeatureAlt(option.label)}" style="width: 100%; height: auto;" />

<!-- Static -->
<img src="${getFeatureURL("static", option.value)}" alt="${getFeatureAlt(option.label)}" />`}
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
    </>
  );
}

function Preview({ option }: { option: Option }) {
  return (
    <>
      <h3>Preview</h3>
      <p>This is how the widget will appear in your project:</p>
      <img
        alt={getFeatureAlt(option.label)}
        src={getFeatureURL("static", option.value)}
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
          <CodeExample option={selectedOption} />
          <Preview option={selectedOption} />
        </>
      ) : null}
    </>
  );
}
