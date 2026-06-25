import { getCollection, getEntry } from "astro:content";
import type { HomeAnnouncement } from "../components/home/announcement/announcement";
import type {
  InstagramPost,
  PressArticle,
  SponsorLogo,
  TeamArea,
} from "./home";

export type ProjectItem = {
  title: string;
  summary: string;
  logoSrc?: string;
  videoUrl?: string;
  gallery: string[];
  model3dSrc?: string;
  body?: string;
};

export type TeamPageSettings = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  studentOrgTitle: string;
  professorsTitle: string;
  workTeamsTitle: string;
  defaultImageSrc: string;
  defaultImageAlt: string;
  fallbackDescription: string;
  membersHeading: string;
  fallbackMember: string;
  showCta: boolean;
};

const defaultTeamPageSettings: TeamPageSettings = {
  title: "Conoce al equipo",
  seoTitle: "Equipo | Cohetería Beauchef",
  seoDescription:
    "Conoce al equipo de Cohetería Beauchef, estudiantes de la Universidad de Chile apasionados por la cohetería e ingeniería aeroespacial.",
  studentOrgTitle: "Organigrama estudiantil",
  professorsTitle: "Profesores de apoyo",
  workTeamsTitle: "Equipos de trabajo",
  defaultImageSrc: "/media/coheteriabeauchef_borderless_logo.webp",
  defaultImageAlt: "Logo de Cohetería Beauchef",
  fallbackDescription: "Detalle del equipo por completar.",
  membersHeading: "Integrantes",
  fallbackMember: "Integrantes por confirmar",
  showCta: true,
};

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

const parseMembersMarkdown = (markdown?: string, fallback: string[] = []) => {
  if (!markdown?.trim()) return fallback;

  return markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "").trim())
    .filter(Boolean);
};

export const withBaseUrl = (path: string, baseUrl: string) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
};

export async function getInstagramPosts(baseUrl: string): Promise<InstagramPost[]> {
  const posts = await getCollection("instagram");

  return posts.sort(byOrder).map(({ data }) => ({
    excerpt: data.excerpt,
    likes: data.likes,
    comments: data.comments,
    postUrl: data.postUrl,
    imageSrc: withBaseUrl(data.imageSrc, baseUrl),
    imageAlt: data.imageAlt,
  }));
}

export async function getPressArticles(baseUrl: string): Promise<PressArticle[]> {
  const articles = await getCollection("news", ({ data }) => !data.draft);

  return articles.sort(byOrder).map(({ data }) => ({
    source: data.source,
    url: data.url,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    imageSrc: withBaseUrl(data.imageSrc, baseUrl),
  }));
}

export async function getSponsorLogos(baseUrl: string): Promise<SponsorLogo[]> {
  const sponsors = await getCollection("sponsors");

  return sponsors.sort(byOrder).map(({ data }) => ({
    src: withBaseUrl(data.src, baseUrl),
    alt: data.alt,
    heightClass: data.heightClass,
  }));
}

export async function getTeamAreas(baseUrl: string): Promise<TeamArea[]> {
  const areas = await getCollection("team");

  return areas.sort(byOrder).map(({ id, data }) => ({
    id,
    kind: data.kind,
    order: data.order,
    lead: {
      ...data.lead,
      imageSrc: data.lead.imageSrc ? withBaseUrl(data.lead.imageSrc, baseUrl) : undefined,
    },
    members: parseMembersMarkdown(data.membersMarkdown, data.members),
    membersMarkdown: data.membersMarkdown,
    description: data.description,
    detailsMarkdown: data.detailsMarkdown,
    coverImageSrc: data.coverImageSrc ? withBaseUrl(data.coverImageSrc, baseUrl) : undefined,
    coverImageAlt: data.coverImageAlt,
  }));
}

export async function getHomeAnnouncement(): Promise<HomeAnnouncement> {
  const entry = await getEntry("site", "announcement");
  const data = entry?.data;

  if (data && "enabled" in data) return data;

  return {
    enabled: false,
    text: "Revisa las novedades del proyecto y la información importante aquí.",
    href: "https://linktr.ee/coheteriabeauchef",
  };
}

export async function getTeamPageSettings(baseUrl: string): Promise<TeamPageSettings> {
  const entry = await getEntry("site", "teamPage");
  const data = entry?.data;
  const settings = data && "title" in data ? data : defaultTeamPageSettings;

  return {
    ...settings,
    defaultImageSrc: withBaseUrl(settings.defaultImageSrc, baseUrl),
  };
}

export async function getProjects(baseUrl: string): Promise<ProjectItem[]> {
  const projects = await getCollection("projects", ({ data }) => !data.draft);

  return projects.sort(byOrder).map(({ body, data }) => ({
    title: data.title,
    summary: data.summary,
    logoSrc: data.logoSrc ? withBaseUrl(data.logoSrc, baseUrl) : undefined,
    videoUrl: data.videoUrl || undefined,
    gallery: data.gallery.map((src) => withBaseUrl(src, baseUrl)),
    model3dSrc: data.model3dSrc ? withBaseUrl(data.model3dSrc, baseUrl) : undefined,
    body,
  }));
}
