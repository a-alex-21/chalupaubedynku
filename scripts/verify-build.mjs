import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const pages = [
  "index",
  "ubytovani",
  "aktivity",
  "cenik",
  "kontakt",
  "rezervace",
  "pokyny",
  "provozni-rad",
];
const base = process.env.SITE_BASE || "/";
const documents = new Map();
for (const page of pages) {
  const html = readFileSync(`dist/${page}.html`, "utf8");
  const document = new JSDOM(html).window.document;
  documents.set(`/${page}.html`, document);
  if (page === "index") documents.set("/", document);
  assert.equal(document.querySelectorAll("h1").length, 1, `${page}: one h1`);
  assert.ok(
    document.querySelector("main")?.textContent.length > 200,
    `${page}: prerendered content`,
  );
  for (const selector of [
    "title",
    'meta[name="description"]',
    'link[rel="canonical"]',
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ])
    assert.ok(document.querySelector(selector), `${page}: ${selector}`);
  const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
  assert.equal(ids.length, new Set(ids).size, `${page}: unique ids`);
  for (const script of document.querySelectorAll(
    'script[type="application/ld+json"]',
  ))
    JSON.parse(script.textContent);
}
for (const page of pages) {
  const document = documents.get(`/${page}.html`);
  for (const element of document.querySelectorAll("[href],[src],[action]")) {
    const value =
      element.getAttribute("href") ||
      element.getAttribute("src") ||
      element.getAttribute("action");
    if (!value || /^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `https://local.test${base}${page}.html`);
    assert.ok(
      url.pathname.startsWith(base),
      `${page}: outside site base: ${value}`,
    );
    const pathname = "/" + url.pathname.slice(base.length);
    const file = resolve(
      "dist",
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    assert.ok(existsSync(file), `${page}: missing ${value}`);
    if (url.hash && documents.has(pathname))
      assert.ok(
        documents
          .get(pathname)
          .getElementById(decodeURIComponent(url.hash.slice(1))),
        `${page}: missing anchor ${value}`,
      );
  }
  for (const img of document.querySelectorAll("img"))
    assert.ok(img.hasAttribute("alt"), `${page}: image alternative text`);
  console.log(
    `Verified ${page}: rendered content, metadata, IDs, links and assets`,
  );
}
