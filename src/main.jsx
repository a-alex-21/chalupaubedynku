import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { routeFromPath } from "./App";
import "./styles.css";
const root = document.getElementById("root");
const app = <App page={routeFromPath(window.location.pathname)} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
