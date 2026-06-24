import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const publicPath = z.string().regex(/^\/?[\w./-]+\.(webp|mp4|webm|glb|gltf)$/);
const optionalPublicPath = z.union([publicPath, z.literal("")]).optional();

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    source: z.string(),
    url: z.url(),
    date: z.string(),
    excerpt: z.string(),
    imageSrc: publicPath,
    order: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    logoSrc: optionalPublicPath,
    videoUrl: z.string().optional(),
    gallery: z.array(publicPath).default([]),
    model3dSrc: optionalPublicPath,
    order: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
  }),
});

const instagram = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/instagram" }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    postUrl: z.url().optional(),
    excerpt: z.string(),
    likes: z.number().int().nonnegative(),
    comments: z.number().int().nonnegative(),
    imageSrc: publicPath,
    imageAlt: z.string(),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/sponsors" }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    src: publicPath,
    alt: z.string(),
    heightClass: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/team" }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    lead: z.object({
      name: z.string(),
      role: z.string(),
      imageSrc: publicPath.optional(),
      imageAlt: z.string().optional(),
    }),
    members: z.array(z.string()).default([]),
    description: z.string().optional(),
    imageSrc: publicPath.optional(),
    imageAlt: z.string().optional(),
  }),
});

const site = defineCollection({
  loader: file("./src/content/site/settings.yml"),
  schema: z.union([
    z.object({
      enabled: z.boolean(),
      text: z.string(),
      href: z.url(),
    }),
  ]),
});

export const collections = { instagram, news, projects, site, sponsors, team };
