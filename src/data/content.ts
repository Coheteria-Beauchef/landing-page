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

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

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

  return areas.sort(byOrder).map(({ data }) => ({
    lead: {
      ...data.lead,
      imageSrc: data.lead.imageSrc ? withBaseUrl(data.lead.imageSrc, baseUrl) : undefined,
    },
    members: data.members,
  }));
}

export async function getHomeAnnouncement(): Promise<HomeAnnouncement> {
  const entry = await getEntry("site", "announcement");

  return entry?.data ?? {
    enabled: false,
    text: "Revisa las novedades del proyecto y la información importante aquí.",
    href: "https://linktr.ee/coheteriabeauchef",
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
