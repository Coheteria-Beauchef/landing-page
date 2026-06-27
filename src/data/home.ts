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
  url: string;
  comments: number;
  imageSrc: string;
  imageAlt: string;
};

export type SponsorLogo = {
  src: string;
  alt: string;
  url: string;
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
      role: "Capitán",
      imageSrc: `${baseUrl}team/vicente-jerez.webp`,
      imageAlt: "Foto de Vicente Jerez",
    },
    members: [],
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
      "Rolando Cuellar",
      "Benjamín Miller",
    ],
  },
  {
    lead: {
      name: "María Jesús Escudero",
      role: "Vinculación y RRSS",
      imageSrc: `${baseUrl}team/maria-jesus-escudero.webp`,
      imageAlt: "Foto de María Jesús Escudero",
    },
    members: [
      "Vicente Castillo",
      "Matías Videla",
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
      imageSrc: `${baseUrl}team/felipe-valdebenito.webp`,
      imageAlt: "Foto de Felipe Valdebenito",
    },
    members: [
      "Vicente Silva",
      "Valentina Sáez",
      "Adriano Villarroel",
      "Lorenzo Leñam",
      "Fernanda Arias",
      "Constanza Fredes",
      "Magdalena Araya",
      'Cristóbal Moreno',
      'Agustín Martínez',
    ],
  },
  {
    lead: {
      name: "Matías Videla",
      role: "Operaciones y Logística",
      imageSrc: `${baseUrl}team/matias-videla.webp`,
      imageAlt: "Foto de Matías Videla",
    },
    members: [
      'Fernanda Arias',
      'María Jesús Escudero',
      'Magdalena Araya',
      'Damián Miranda',
      'Benjamín Miller',
    ],
  },
  {
    lead: {
      name: "Piero Tardón",
      role: "Combustible y Procesos",
      imageSrc: `${baseUrl}team/piero-tardon.webp`,
      imageAlt: "Foto de Piero Tardón",
    },
    members: [
      "Agustín Martínez",
      "Felipe García",
      "Benjamín Ríos",
      "Allison Valdivia",
      "Rafael Rocha",
    ],
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
      "Matías Videla",
      "Vicente Aguilar",
      "Benjamín Salinas",
      "Oscar Aravena",
      "Felipe Colli Olea",
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
    source: "instagram",
    url: "https://uchile.cl/noticias/230075/u-de-chile-prueba-con-exito-su-primer-motor-de-cohete-estudiantil",
    title: "Creality y TodoToner se suman como auspiciadores de Cohetería Beauchef!",
    date: "27 de junio de 2026",
    excerpt:
      "El apoyo de ambas empresas aportará impresión 3D y filamentos reforzados con fibra de carbono para los lanzamientos de Minerva I.",
    imageSrc: `${baseUrl}press/noticia-1.webp`,
  },
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
  { href: "#proyectos", label: "Posts" },
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
  { value: "2611N", label: "Empuje máximo alcanzado" },
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
      "🚀 ¡Bienvenidos @crealitylatam y @todotoner.cl!\nEstamos muy felices de anunciar el apoyo de Creality LATAM, por medio de TodoToner.cl, como auspiciadores oficiales!",
    likes: 93,
    comments: 9,
    url: "https://www.instagram.com/p/DaDwphdxsdr/",
    imageSrc: `${baseUrl}/instagram/post_ig_1.webp`,
    imageAlt: "Instagram Post 1",
  },
    {
    excerpt:
      "🚀¿Por qué Minerva I?\n\n¡Te contamos cuál es el nombre de nuestra primera misión de lanzamiento en Brasil!🚀",
    likes: 613,
    comments: 15,
    url: "https://www.instagram.com/p/DXvI0nQxgzM/",
    imageSrc: `${baseUrl}/instagram/post_ig_2.webp`,
    imageAlt: "Instagram Post 2",
  },
  {
    excerpt:
      "🚀 ¡Bienvenidos @reite.ai!\n\nEstamos muy felices de anunciar el apoyo de Reite como auspiciadores oficiales!",
    likes: 83,
    comments: 11,
    url: "https://www.instagram.com/p/DZ_R5WxNsH8/",
    imageSrc: `${baseUrl}/instagram/post_ig_3.webp`,
    imageAlt: "Instagram Post 3",
  },
];

export const sponsorLogos: SponsorLogo[] = [
  { src: `${baseUrl}sponsors/creality_logo.webp`, alt: "Creality", url: "https://www.creality.com/es" },
  { src: `${baseUrl}sponsors/todotoner_logo.webp`, alt: "TodoToner", url: "https://www.todotoner.cl/" },
  { src: `${baseUrl}sponsors/fcfm_logo.webp`, alt: "FCFM", url: "https://ingenieria.uchile.cl/" },
  { src: `${baseUrl}sponsors/departamento_mecanica_logo.webp`, alt: "Mecánica", url: "https://dimec.uchile.cl/" },
  { src: `${baseUrl}sponsors/die_fcfm.webp`, alt: "Eléctrica", url: "https://www.die.cl/" },
  { src: `${baseUrl}sponsors/fablab_logo.webp`, alt: "FabLab", url: "https://www.instagram.com/fablabudechile/" },
  { src: `${baseUrl}sponsors/maquintel_logo.webp`, alt: "Maquintel", url: "https://www.maquintel.com/", heightClass: "h-[100px]" },
  { src: `${baseUrl}sponsors/alutipo_logo.webp`, alt: "Alutipo", url: "https://alutipo.cl/" },
  { src: `${baseUrl}sponsors/micro.webp`, alt: "Micro Automación", url: "https://cl.microautomacion.com/es/inicio/" },
  { src: `${baseUrl}sponsors/logo_ansys.webp`, alt: "Ansys", url: "https://www.ansys.com/", heightClass: "h-[120px]" },
  { src: `${baseUrl}sponsors/logo_esss.webp`, alt: "ESSS", url: "https://www.esss.com/es/", heightClass: "h-[120px]" },
  { src: `${baseUrl}sponsors/fabricala_logo.webp`, alt: "FABRICALA", url: "https://www.fabricala.pro/", heightClass: "h-[70px]" },
  { src: `${baseUrl}sponsors/reite_logo.webp`, alt: "REITE", url: "https://reite.cl/", heightClass: "h-[50px]" },
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
