import { Link } from "react-router-dom";
import { cx } from "@/lib/text";

export function TagPill({ label, slug, className }: { label: string; slug: string; className?: string }) {
  return (
    <Link
      to={`/tags/${slug}`}
      className={cx(
        "pill inline-flex items-center px-3 py-1 text-xs",
        "focus-visible:outline-none",
        className
      )}
      style={{ color: "rgb(var(--fg-rgb))" }}
    >
      {label}
    </Link>
  );
}
