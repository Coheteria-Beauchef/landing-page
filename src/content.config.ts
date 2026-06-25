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
    kind: z.enum(["captain", "area", "support", "professor"]).default("area"),
    order: z.number().int().nonnegative(),
    lead: z.object({
      name: z.string(),
      role: z.union([z.string(), z.array(z.string())]),
      imageSrc: optionalPublicPath,
      imageAlt: z.string().optional(),
    }),
    members: z.array(z.string()).default([]),
    membersMarkdown: z.string().optional(),
    description: z.string().optional(),
    detailsMarkdown: z.string().optional(),
    coverImageSrc: optionalPublicPath,
    coverImageAlt: z.string().optional(),
    imageSrc: optionalPublicPath,
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
    z.object({
      title: z.string(),
      seoTitle: z.string(),
      seoDescription: z.string(),
      studentOrgTitle: z.string(),
      professorsTitle: z.string(),
      workTeamsTitle: z.string(),
      defaultImageSrc: publicPath,
      defaultImageAlt: z.string(),
      fallbackDescription: z.string(),
      membersHeading: z.string(),
      fallbackMember: z.string(),
      showCta: z.boolean().default(true),
    }),
  ]),
});

export const collections = { instagram, news, projects, site, sponsors, team };
