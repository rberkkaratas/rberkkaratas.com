import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";

export function AppShell() {
  return (
    <div className="min-h-dvh flex flex-col">
      <SkipLink />
      <Header />

      <main id="main" className="relative flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 0%, rgba(120, 119, 198, 0.14), rgba(0,0,0,0))"
          }}
        />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
