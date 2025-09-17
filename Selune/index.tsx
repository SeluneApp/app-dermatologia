import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CalendrioNoite } from "./screens/CalendrioNoite/CalendrioNoite";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <CalendrioNoite />
  </StrictMode>,
);
