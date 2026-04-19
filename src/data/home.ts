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

export type TeamMember = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Matías Videla",
    role: "Capitán",
    imageSrc: `${baseUrl}team/matias-videla.webp`,
    imageAlt: "Foto de Matías Videla",
  },
  {
    name: "Vicente Jerez",
    role: "Capitán",
    imageSrc: `${baseUrl}team/vicente-jerez.webp`,
    imageAlt: "Foto de Vicente Jerez",
  },
  {
    name: "Nicolás Herrera",
    role: "Fuselaje",
    imageSrc: `${baseUrl}team/nicolas-herrera.webp`,
    imageAlt: "Foto de Nicolás Herrera",
  },
  {
    name: "María Jesús Escudero",
    role: "Gestión",
    imageSrc: `${baseUrl}team/maria-jesus-escudero.webp`,
    imageAlt: "Foto de María Jesús Escudero",
  },
];

export type PressArticle = {
  source: string;
  url: string;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
};

export const pressArticles: PressArticle[] = [
  {
    source: "uchile.cl",
    url: "https://uchile.cl/noticias/230075/u-de-chile-prueba-con-exito-su-primer-motor-de-cohete-estudiantil",
    title: "Estudiantes de la U. de Chile prueban con éxito su primer motor de cohete",
    date: "9 de julio de 2025",
    excerpt:
      "El equipo realizó una prueba estática exitosa de su primer motor de propergol sólido, diseñado y construido íntegramente por sus integrantes.",
    imageSrc: `${baseUrl}press/noticia-1.webp`,
  },
  {
    source: "ingenieria.uchile.cl",
    url: "https://ingenieria.uchile.cl/noticias/230030/coheteria-beauchef-avanza-con-exitosa-prueba-de-motor",
    title: "Cohetería Beauchef da un gran paso con exitosa prueba de motor estudiantil",
    date: "8 de julio de 2025",
    excerpt:
      "La Facultad de Ingeniería destacó el logro del equipo, que los posiciona para participar en competencias internacionales de cohetería experimental.",
    imageSrc: `${baseUrl}press/noticia-2.webp`,
  },
  {
    source: "dimec.uchile.cl",
    url: "https://dimec.uchile.cl/coheteria-beauchef-estudiantes-del-dimec-innovan-para-conectar-la-universidad-con-la-industria-aeroespacial/",
    title: "Cohetería Beauchef: estudiantes del DIMEC innovan para conectar la universidad con la industria aeroespacial",
    date: "3 de julio de 2025",
    excerpt:
      "El Departamento de Ingeniería Mecánica destacó cómo el equipo busca establecer la cohetería experimental como disciplina académica en Chile.",
    imageSrc: `${baseUrl}press/noticia-3.webp`,
  },
];

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
  { href: `${baseUrl}equipo`, label: "Equipo" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#prensa", label: "Prensa" },
  { href: "#contacto", label: "Contacto" },
];

export const footerNavigationLinks: NavigationLink[] = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proyectos", label: "Proyectos" },
  { href: `${baseUrl}equipo`, label: "Equipo" },
  { href: "#sponsors", label: "Sponsors" },
];

export const homeStats: StatItem[] = [
  { value: "2023", label: "Año de fundación" },
  { value: "1052N", label: "Empuje máximo alcanzado" },
  { value: "20+", label: "Estudiantes activos" },
  { value: "100%", label: "Motor de estudiantes" },
];

/**
 * For agents:
 * This is the instagram posts of the account https://www.instagram.com/coheteriabeauchef/
 * In case of update, fetch the description, number of likes, number of comments and the Image
 * Transform the image into webp and then update the three or more posts to show
 * Commit and push the changes to the repository
 * If the required tooling is missing, tell the user what is missing and suggest how to install it in VS Code.
 * Only recommend additional tools if they are actually needed to complete the task.
 */
export const instagramPosts: InstagramPost[] = [
  {
    excerpt:
      "🚀 ¡Nuevo aliado en el equipo!\nLe damos la bienvenida a @maquintelrobotics quienes se suman como auspiciadores oficiales para este 2026. 🌌 Con su apoyo, nuestro proyecto está cada vez más cerca de despegar...",
    likes: 22,
    comments: 0,
    imageSrc: `${baseUrl}post_instagram_1.webp`,
    imageAlt: "Instagram Post 1",
  },
  {
    excerpt:
      "🚀¡Arrancamos fuerte el año!\nHoy damos la bienvenida a @alutipo.chile que se une como auspiciador de Cohetería Beauchef...",
    likes: 31,
    comments: 2,
    imageSrc: `${baseUrl}post_instagram_2.webp`,
    imageAlt: "Instagram Post 2",
  },
  {
    excerpt:
      "🚀 ¡Seguimos creciendo!\nHoy damos la bienvenida a @fablabudechile que se une como colaborador de Cohetería Beauchef...",
    likes: 27,
    comments: 0,
    imageSrc: `${baseUrl}post_instagram_3.webp`,
    imageAlt: "Instagram Post 3",
  },
];

export const sponsorLogos: SponsorLogo[] = [
  { src: `${baseUrl}auspiciadores/fcfm_logo.webp`, alt: "FCFM" },
  { src: `${baseUrl}auspiciadores/departamento_mecanica_logo.webp`, alt: "Mecánica" },
  { src: `${baseUrl}auspiciadores/departamento_electrica_logo.webp`, alt: "Eléctrica" },
  {
    src: `${baseUrl}auspiciadores/fablab_logo.svg`,
    alt: "FabLab",
    heightClass: "h-[75px]",
  },
  { src: `${baseUrl}auspiciadores/maquintel_logo.webp`, alt: "Maquintel", heightClass: "h-20" },
  { src: `${baseUrl}auspiciadores/alutipo_logo.webp`, alt: "Alutipo" },
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
