import { readFile, writeFile, rm } from "node:fs/promises";
import { renderPage } from "../.prerender/entry-server.js";
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
for (const page of pages) {
  const path = new URL(`../dist/${page}.html`, import.meta.url);
  const html = await readFile(path, "utf8");
  if (!html.includes('<div id="root"></div>'))
    throw new Error(`Missing React mount in ${page}`);
  await writeFile(
    path,
    html.replace(
      '<div id="root"></div>',
      () => `<div id="root">${renderPage(page)}</div>`,
    ),
  );
  console.log(`Prerendered /${page === "index" ? "" : page + ".html"}`);
}
await rm(new URL("../.prerender", import.meta.url), {
  recursive: true,
  force: true,
});
