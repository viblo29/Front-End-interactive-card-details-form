import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Content from "./Content.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Content />
  </StrictMode>
);
