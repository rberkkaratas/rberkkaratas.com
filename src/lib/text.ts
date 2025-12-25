export function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
  }
  
  export function toTagSlug(tag: string) {
    return tag
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  export function prettyDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  }
  