import "water.css/out/light.min.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("app");
if (!container) {
  throw new Error("Cannot render app");
}

const root = createRoot(container);
root.render(<App />);
