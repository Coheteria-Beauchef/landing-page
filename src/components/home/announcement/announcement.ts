export type HomeAnnouncement = {
  enabled: boolean;
  text: string;
  href: string;
};

/**
 * Anuncio para la página de inicio. Puedes personalizar el texto y el enlace según tus necesidades.
 *
 * enabled: Activa o desactiva el anuncio.
 * href: El enlace al que se dirigirá el usuario al hacer clic en el anuncio.
 * text: El mensaje que deseas mostrar en el anuncio.
 * 
 * Pushea los cambios al final
 */
export const homeAnnouncement: HomeAnnouncement = {
  enabled: false,
  text: "Revisa las novedades del proyecto y la información importante aquí.",
  href: "https://linktr.ee/coheteriabeauchef",
};
