import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Every Markdown file in src/content/projects becomes a project card + modal.
// Frontmatter holds the details below; the Markdown body is the long description.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.string(),
      status: z.string().default("Completed"),
      order: z.number().default(0),
      summary: z.string(),
      stack: z.array(z.string()),
      // Shown in the "Tech Stack Highlights" box; falls back to `stack`.
      highlights: z.array(z.string()).optional(),
      icon: z.enum(["sparkles", "checklist", "globe", "code"]).default("sparkles"),
      // Banner media. `image` is a path relative to the Markdown file and gets
      // optimised; `video` is a path inside public/ and plays muted on a loop.
      image: image().optional(),
      video: z.string().optional(),
      live: z.string().optional(),
      source: z.string().optional(),
      download: z
        .object({
          href: z.string(),
          label: z.string().default("Download"),
          note: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
