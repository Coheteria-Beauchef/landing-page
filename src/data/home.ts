const baseUrl = import.meta.env.BASE_URL;

export type NavigationLink = {
  href: string;
  label: string;
};

export const joinTeamFormUrl =
  "https://docs.google.com/forms/d/1vyjHI6xVyBgM_vzmK09dA2AxAkPrcnCyfVkX4mjg6kw/viewform?pli&pli&edit_requested=true";

export const socialProfiles = {
  instagram: "https://www.instagram.com/coheteriabeauchef",
  tiktok: "https://www.tiktok.com/@coheteriabeauchef?_t=zm-8xayedlovid&_r=1",
  youtube: "https://youtube.com/@coheteriabeauchef?si=kDUbIPtshBXwUgMn",
  linkedin: "https://www.linkedin.com/company/coheteria-beauchef/",
} as const;

export type StatItem = {
  value: string;
  label: string;
};

export type InstagramPost = {
  excerpt: string;
  likes: number;
  comments: number;
  imageSrc: string;
  imageAlt: string;
};

export type SponsorLogo = {
  src: string;
  alt: string;
  heightClass?: string;
};

export type SocialPlatform = "instagram" | "youtube" | "linkedin" | "tiktok";

export type SocialLink = {
  href: string;
  label: string;
  platform: SocialPlatform;
  bgClass: string;
  hoverBgClass: string;
  hoverTextClass?: string;
};

export const headerNavigationLinks: NavigationLink[] = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "/equipo", label: "Equipo" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#contacto", label: "Contacto" },
];

export const footerNavigationLinks: NavigationLink[] = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "/equipo", label: "Equipo" },
  { href: "#sponsors", label: "Sponsors" },
];

export const homeStats: StatItem[] = [
  { value: "2023", label: "Año de fundación" },
  { value: "1052N", label: "Empuje máximo alcanzado" },
  { value: "20+", label: "Estudiantes activos" },
  { value: "100%", label: "Motor de estudiantes" },
];

export const instagramPosts: InstagramPost[] = [
  {
    excerpt:
      "🚀 ¡Nuevo aliado en el equipo!\nLe damos la bienvenida a @maquintelrobotics quienes se suman como auspiciadores oficiales para este 2026. 🌌 Con su apoyo, nuestro proyecto está cada vez más cerca de despegar...",
    likes: 22,
    comments: 0,
    imageSrc: `${baseUrl}post_instagram_1.jpg`,
    imageAlt: "Instagram Post 1",
  },
  {
    excerpt:
      "🚀¡Arrancamos fuerte el año!\nHoy damos la bienvenida a @alutipo.chile que se une como auspiciador de Cohetería Beauchef...",
    likes: 31,
    comments: 2,
    imageSrc: `${baseUrl}post_instagram_2.jpg`,
    imageAlt: "Instagram Post 2",
  },
  {
    excerpt:
      "🚀 ¡Seguimos creciendo!\nHoy damos la bienvenida a @fablabudechile que se une como colaborador de Cohetería Beauchef...",
    likes: 27,
    comments: 0,
    imageSrc: `${baseUrl}post_instagram_3.jpg`,
    imageAlt: "Instagram Post 3",
  },
];

export const sponsorLogos: SponsorLogo[] = [
  { src: `${baseUrl}auspiciadores/fcfm_logo.png`, alt: "FCFM" },
  { src: `${baseUrl}auspiciadores/departamento_mecanica_logo.webp`, alt: "Mecánica" },
  { src: `${baseUrl}auspiciadores/departamento_electrica_logo.png`, alt: "Eléctrica" },
  {
    src: `${baseUrl}auspiciadores/fablab_logo.svg`,
    alt: "FabLab",
    heightClass: "h-[75px]",
  },
  { src: `${baseUrl}auspiciadores/maquintel_logo.png`, alt: "Maquintel", heightClass: "h-20" },
  { src: `${baseUrl}auspiciadores/alutipo_logo.png`, alt: "Alutipo" },
];

export const socialLinks: SocialLink[] = [
  {
    href: socialProfiles.instagram,
    label: "INSTAGRAM",
    platform: "instagram",
    bgClass: "bg-[#eb1bcd]",
    hoverBgClass: "hover:bg-[#f77737]",
  },
  {
    href: socialProfiles.tiktok,
    label: "TIKTOK",
    platform: "tiktok",
    bgClass: "bg-[#000000]",
    hoverBgClass: "hover:bg-[#25F4EE]",
    hoverTextClass: "hover:text-[#0f172a]",
  },
  {
    href: socialProfiles.youtube,
    label: "YOUTUBE",
    platform: "youtube",
    bgClass: "bg-[#E81A1A]",
    hoverBgClass: "hover:bg-[#ff6b6b]",
  },
  {
    href: socialProfiles.linkedin,
    label: "LINKEDIN",
    platform: "linkedin",
    bgClass: "bg-[#1D79B3]",
    hoverBgClass: "hover:bg-[#60a5fa]",
    hoverTextClass: "hover:text-[#0f172a]",
  },
];
