import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import "./App.css";

// Lazy load analytics after first paint to avoid blocking initial render
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => import("./openpanel"));
  } else {
    setTimeout(() => import("./openpanel"), 1);
  }
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
