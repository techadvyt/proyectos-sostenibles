import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    materials: z.string(),
    course: z.string(),
    members: z.array(z.string()),
    hasBlogContent: z.boolean().default(false),
  }),
});

export const collections = { projects };
