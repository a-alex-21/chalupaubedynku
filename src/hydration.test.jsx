import React, { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { expect, it } from "vitest";
import App from "./App";
for (const page of [
  "index",
  "ubytovani",
  "aktivity",
  "cenik",
  "kontakt",
  "rezervace",
  "pokyny",
  "provozni-rad",
]) {
  it(`hydrates prerendered ${page} without a markup mismatch`, async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<App page={page} />);
    document.body.append(container);
    const errors = [];
    let root;
    await act(async () => {
      root = hydrateRoot(container, <App page={page} />, {
        onRecoverableError: (error) => errors.push(error.message),
      });
    });
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(errors).toEqual([]);
    await act(async () => root.unmount());
    container.remove();
  });
}
