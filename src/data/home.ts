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
  imageSrc?: string;
  imageAlt?: string;
};

export type TeamArea = {
  lead: TeamMember;
  members: string[];
};

export const teamAreas: TeamArea[] = [
  {
    lead: {
      name: "Matías Videla",
      role: "Capitán",
      imageSrc: `${baseUrl}team/matias-videla.webp`,
      imageAlt: "Foto de Matías Videla",
    },
    members: [],
  },
  {
    lead: {
      name: "Vicente Jerez",
      role: "Telemetría",
      imageSrc: `${baseUrl}team/vicente-jerez.webp`,
      imageAlt: "Foto de Vicente Jerez",
    },
    members: [
      "Rosangel Arispe",
      "Eduardo Ibacache",
      "Vicente Aguilar",
      "Benjamín Salinas",
      "Oscar Aravena",
      "Felipe Colli Olea",
    ],
  },
  {
    lead: {
      name: "Nicolás Herrera",
      role: "Fuselaje",
      imageSrc: `${baseUrl}team/nicolas-herrera.webp`,
      imageAlt: "Foto de Nicolás Herrera",
    },
    members: [
      "Javier Garretón",
      "Fernanda Bizama",
      "Maika Vera",
      "Camilo Guzmán",
      "Rolando Cuéllar",
      "Benjamín Miller",
    ],
  },
  {
    lead: {
      name: "María Jesús Escudero",
      role: "Gestión",
      imageSrc: `${baseUrl}team/maria-jesus-escudero.webp`,
      imageAlt: "Foto de María Jesús Escudero",
    },
    members: [
      "Vicente Castillo",
      "Benjamín Miller",
      "Magdalena Araya",
      "Antonia Flández",
      "Damián Miranda",
      "Sofía Vargas Trujillo",
    ],
  },
  {
    lead: {
      name: "Felipe Valdebenito",
      role: "Motor",
      imageSrc: `${baseUrl}placeholder_pfp.svg`,
      imageAlt: "Foto de Felipe Valdebenito",
    },
    members: [
      "Valentina Sáez",
      "Adriano Villarroel",
      "Lorenzo Leñam",
      "Fernanda Arias",
      "Constanza Fredes",
      "Vicente Silva",
    ],
  },
  {
    lead: {
      name: "Piero Tardón",
      role: "Combustible",
      imageSrc: `${baseUrl}placeholder_pfp.svg`,
      imageAlt: "Foto de Piero Tardón",
    },
    members: [
      "Agustín Martínez",
      "Felipe García Castillo",
      "Benjamín Ríos",
      "Allison Valdivia",
      "Rafael Rocha",
    ],
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
    source: "ingenieria.uchile.cl",
    url: "https://ingenieria.uchile.cl/noticias/239680/fcfm-representara-a-chile-en-importante-desafio-internacional-de-coheteria",
    title: "FCFM representará a Chile en importante desafío internacional de cohetería",
    date: "30 de abril de 2026",
    excerpt:
      "Las y los estudiantes de la FCFM serán parte del Latin American Space Challenge (LASC), una de las competencias de cohetes y satélites más grande del mundo.",
    imageSrc: `${baseUrl}press/noticia-4.webp`,
  },
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
  { value: "30+", label: "Estudiantes activos" },
  { value: "100%", label: "Desarrollado por estudiantes" },
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
      "🌌 ¡PREPÁRATE LASC 2026!\nOficialmente fuimos aceptados para participar en el Latin American Space Challenge 2026 – 7ma Edición 🚀",
    likes: 329,
    comments: 31,
    imageSrc: `${baseUrl}post_ig_5.webp`,
    imageAlt: "Instagram Post 5",
  },
  {
    excerpt:
      "🚀¿Por qué Minerva I?\n¡Te contamos cuál es el nombre de nuestra primera misión de lanzamiento en Brasil!🚀",
    likes: 582,
    comments: 15,
    imageSrc: `${baseUrl}post_ig_6.webp`,
    imageAlt: "Instagram Post 6",
  },
  {
    excerpt:
      "🚀 🚀 ¡Bienvenidos @microautomacion.cl!\nEsta gran empresa se suma como auspiciador oficial para este 2026. 🌌",
    likes: 55,
    comments: 0,
    imageSrc: `${baseUrl}post_ig_4.webp`,
    imageAlt: "Instagram Post 4",
  },
];

export const sponsorLogos: SponsorLogo[] = [
  { src: `${baseUrl}auspiciadores/fcfm_logo.webp`, alt: "FCFM" },
  { src: `${baseUrl}auspiciadores/departamento_mecanica_logo.webp`, alt: "Mecánica" },
  { src: `${baseUrl}auspiciadores/departamento_electrica_logo.webp`, alt: "Eléctrica" },
  {
    src: `${baseUrl}auspiciadores/fablab_logo.svg`, alt: "FabLab", heightClass: "h-[100px]",
  },
  { src: `${baseUrl}auspiciadores/maquintel_logo.webp`, alt: "Maquintel", heightClass: "h-[100px]" },
  { src: `${baseUrl}auspiciadores/alutipo_logo.webp`, alt: "Alutipo" },
  { src: `${baseUrl}auspiciadores/micro.webp`, alt: "Micro Automación" },
  { src: `${baseUrl}auspiciadores/logo_ansys.webp`, alt: "Ansys", heightClass: "h-[50px]" },
  { src: `${baseUrl}auspiciadores/logo_esss.webp`, alt: "ESSS", heightClass: "h-[50px]" },
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
