import { Section } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { posts } from "@/generated/posts";
import projectsRaw from "@/../content/projects.json";
import type { Project } from "@/types/content";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PostList } from "@/components/PostList";
import { useRouteMeta } from "@/hooks/useRouteMeta";
import { metaForStatic } from "@/lib/meta";
import { site } from "@/config/site";

const projects = projectsRaw as Project[];

export default function Home() {
  useRouteMeta(metaForStatic("/"));

  const latestPosts = posts.slice(0, 3);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {site.name}
              <span className="block text-zinc-400">Football Data Analyst.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-300">
            I build tools and write-ups that connect on-pitch actions to outcomes: possession structure, passing networks, chance creation, and player profiles. Delivered with clean visuals and practical recommendations.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/projects">View Projects</Button>
              <Button to="/blog" variant="ghost">
                Read My Blog
              </Button>
            </div>
          </div>

          <GlassCard className="lg:col-span-1">
            <h2 className="text-sm font-semibold">Highlights</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>• Event-data analysis: possession, passing networks, chance creation, player profiles</li>
              <li>• Reproducible pipelines: clean inputs → metrics → visuals → brief recommendations</li>
              <li>• Communication: short reports, notebooks, and posts that explain “why”, not just “what”</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section title="Featured projects" eyebrow="Selected work">
        <ProjectGrid projects={featured} />
      </Section>

      <Section title="Latest posts" eyebrow="Writing">
        <PostList posts={latestPosts} />
        <div className="mt-6">
          <Button to="/blog" variant="ghost">
            See all posts
          </Button>
        </div>
      </Section>
    </>
  );
}
