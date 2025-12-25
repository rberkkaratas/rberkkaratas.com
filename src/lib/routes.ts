import { site } from "@/config/site";

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return path;
  const joined = `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  return joined.replace(/\/+$/, "") || "/";
}

export function canonicalUrl(path: string) {
  return `${site.siteUrl.replace(/\/$/, "")}${withBase(path)}`;
}
