import type { ReactNode } from "react";
import { cx } from "@/lib/text";

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("glass-card p-5", className)}>{children}</div>;
}
