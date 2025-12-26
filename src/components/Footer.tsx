import { Container } from "@/components/Container";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60">
      <Container className="flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-3 text-sm">
          <a className="underline-offset-4 hover:underline" href={site.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="underline-offset-4 hover:underline" href={site.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="underline-offset-4 hover:underline" href="/rss.xml">
            RSS
          </a>
        </div>
      </Container>
    </footer>
  );
}
