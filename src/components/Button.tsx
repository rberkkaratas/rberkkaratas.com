import { Link } from "react-router-dom";
import { cx } from "@/lib/text";
import type { ReactNode } from "react";

type Common = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const variants = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost"
};

export function Button(props: Common & { to: string }) {
  const { to, children, variant = "primary", className } = props;
  return (
    <Link
      to={to}
      className={cx(
        variants[variant],
        "inline-flex items-center justify-center focus-visible:outline-none",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function ButtonExternal(props: Common & { href: string }) {
  const { href, children, variant = "primary", className } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        variants[variant],
        "inline-flex items-center justify-center focus-visible:outline-none",
        className
      )}
    >
      {children}
    </a>
  );
}
