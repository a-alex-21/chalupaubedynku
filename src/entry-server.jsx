import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
export const renderPage = (page) => renderToString(<App page={page} />);
