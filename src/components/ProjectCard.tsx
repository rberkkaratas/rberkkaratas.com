import type { Project } from "@/types/content";
import { GlassCard } from "@/components/GlassCard";
import { ButtonExternal } from "@/components/Button";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold">{project.name}</h3>
        {project.featured && (
          <span className="rounded-full border border-zinc-200/70  px-2 py-1 text-[11px]   bg-zinc-950/25 text-zinc-200">
            Featured
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-400">{project.summary}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border  px-2 py-1 text-[11px]  border-zinc-800/70bg-zinc-950/25 text-zinc-200"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-2 pt-2">
        {project.links.live && <ButtonExternal href={project.links.live} variant="ghost">Live</ButtonExternal>}
        {project.links.repo && <ButtonExternal href={project.links.repo} variant="ghost">Repo</ButtonExternal>}
        {project.links.docs && <ButtonExternal href={project.links.docs} variant="ghost">Docs</ButtonExternal>}
      </div>
    </GlassCard>
  );
}
