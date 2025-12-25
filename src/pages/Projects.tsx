import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import projectsRaw from "@/../content/projects.json";
import type { Project } from "@/types/content";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForStatic } from "@/lib/meta";

const projects = projectsRaw as Project[];

export default function Projects() {
  useRouteMeta(metaForStatic("/projects"));

  const sorted = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section title="Projects" eyebrow="Portfolio">
      <ProjectGrid projects={sorted} />
    </Section>
  );
}
