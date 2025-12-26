import type { ReactNode } from "react";
import { cx } from "@/lib/text";
import { Container } from "@/components/Container";

export function Section({
  title,
  eyebrow,
  children,
  className
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("py-10 sm:py-14", className)}>
      <Container>
        {(eyebrow || title) && (
          <header className="mb-6">
            {eyebrow && <p className="text-sm text-zinc-400">{eyebrow}</p>}
            {title && <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
