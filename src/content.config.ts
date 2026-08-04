import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Two kinds of entry, rendered differently:
//   build       systems built from nothing, shown as full cards
//   improvement changes made to systems that already existed, shown as a list
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    kind: z.enum(['build', 'improvement']),
    title: z.string(),
    summary: z.string(),
    context: z.enum(['Akasha Wira International', 'HashMicro', 'Personal']).optional(),
    year: z.string(),
    stack: z.array(z.string()),
    visibility: z.enum(['public', 'internal']),
    repo: z.string().url().optional(),
    // Only builds carry these: the features that make up the system.
    parts: z.array(z.string()).optional(),
    // Opens its own page instead of the dialog. For entries whose body is a long
    // list rather than a case study.
    linkOnly: z.boolean().default(false),
    weight: z.number().default(0),
    // Optional line chart, rendered above the body.
    chart: z
      .object({
        caption: z.string(),
        annotate: z.string().optional(),
        points: z.array(z.object({ label: z.string(), value: z.number() })),
      })
      .optional(),
  }),
});

export const collections = { work };
