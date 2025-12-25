import { NavLink } from "react-router-dom";
import { site } from "@/config/site";
import { Container } from "@/components/Container";
import { cx } from "@/lib/text";

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-40">
      <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="rounded-lg px-2 py-1 text-sm font-semibold tracking-tight focus-visible:outline-none"
        >
        </NavLink>

        <nav aria-label="Primary" className="flex items-center gap-2">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cx(
                  "rounded-xl px-3 py-2 text-sm transition focus-visible:outline-none",
                  "hover:bg-[rgb(var(--surface-1-rgb)/calc(var(--surface-1-a)+0.12))]",
                  isActive
                    ? "bg-[rgb(var(--surface-1-rgb)/calc(var(--surface-1-a)+0.16))] font-medium"
                    : "muted"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>
      </Container>
    </header>
  );
}
