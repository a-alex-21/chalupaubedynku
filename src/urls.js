export const siteUrl = (path = "") =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");
