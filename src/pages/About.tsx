import { Section } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForStatic } from "@/lib/meta";

export default function About() {
  useRouteMeta(metaForStatic("/about"));

  return (
    <Section title="About" eyebrow="Background">
      {/* Intro line (outside cards) */}
      <div className="mx-auto max-w-4xl">
        <p className="mt-2 text-sm leading-relaxed subtle">
          Football Data Analyst focused on event-data insights for match analysis and recruitment.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-6 grid max-w-4xl gap-7">
        <GlassCard className="p-7 sm:p-8">
          <h3 className="text-base font-semibold">What I do</h3>

          <p className="mt-3 text-sm leading-relaxed muted">
            I analyze football performance using event data and build reproducible tools that support match analysis
            and recruitment decisions. My focus is clear assumptions, clean visuals, and outputs that translate into
            actionable recommendations.
          </p>

          <ul className="mt-5 space-y-2 text-sm muted">
            <li>
              <span className="font-medium" style={{ color: "rgb(var(--fg-rgb))" }}>
                Match analysis:
              </span>{" "}
              possession structure, passing networks, chance creation patterns
            </li>
            <li>
              <span className="font-medium" style={{ color: "rgb(var(--fg-rgb))" }}>
                Recruitment support:
              </span>{" "}
              role-based player profiles, comparables, shortlist rationale
            </li>
            <li>
              <span className="font-medium" style={{ color: "rgb(var(--fg-rgb))" }}>
                Engineering:
              </span>{" "}
              reusable pipelines (ingest → validate → metrics → visuals → notes)
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="p-7 sm:p-8">
          <h3 className="text-base font-semibold">What I write</h3>

          <p className="mt-3 text-sm leading-relaxed muted">
            Short notes on football analytics: methods, visualization choices, and how to avoid common interpretation
            traps. I write to make analysis auditable and reusable.
          </p>

          {/* Optional: small tag chips (kept minimal and consistent) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Methodology", "Recruitment", "Match Analysis", "Visualization", "Engineering"].map((t) => (
              <span key={t} className="pill px-3 py-1 text-xs" style={{ color: "rgb(var(--fg-rgb))" }}>
                {t}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
