import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForStatic } from "@/lib/meta";

export default function NotFound() {
  useRouteMeta(metaForStatic("/404"));
  return (
    <Section title="Page not found" eyebrow="404">
      <p className="text-sm text-zinc-400">The page you requested does not exist.</p>
      <div className="mt-6">
        <Button to="/">Go home</Button>
      </div>
    </Section>
  );
}

export function NotFoundInline() {
  return (
    <Section title="Page not found" eyebrow="404">
      <p className="text-sm text-zinc-400">The page you requested does not exist.</p>
      <div className="mt-6">
        <Button to="/">Go home</Button>
      </div>
    </Section>
  );
}
