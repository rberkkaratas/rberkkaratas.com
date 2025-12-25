export type PostFrontmatter = {
    title: string;
    date: string; // ISO yyyy-mm-dd or full ISO
    summary: string;
    tags: string[];
    cover?: string;
    draft?: boolean;
  };
  
  export type Post = {
    slug: string;
    frontmatter: PostFrontmatter;
    html: string;
    tagSlugs: string[];
    relatedSlugs: string[];
  };
  
  export type Project = {
    id: string;
    name: string;
    summary: string;
    stack: string[];
    links: {
      live?: string;
      repo?: string;
      docs?: string;
    };
    featured: boolean;
    dates: {
      start?: string;
      end?: string;
    };
  };
  