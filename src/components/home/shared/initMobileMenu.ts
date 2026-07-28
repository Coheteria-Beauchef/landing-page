export function initMobileMenu(nav: Element | null) {
  if (!(nav instanceof HTMLElement) || nav.dataset.mobileMenuInitialized === "true") return;

  const button = nav.querySelector("[data-hamburger]");
  const menu = nav.querySelector("[data-mobile-menu]");
  const bar1 = button?.querySelector("[data-bar-1]");
  const bar2 = button?.querySelector("[data-bar-2]");
  const bar3 = button?.querySelector("[data-bar-3]");

  if (
    !(button instanceof HTMLButtonElement) ||
    !(menu instanceof HTMLElement) ||
    !(bar1 instanceof HTMLElement) ||
    !(bar2 instanceof HTMLElement) ||
    !(bar3 instanceof HTMLElement)
  ) {
    return;
  }

  nav.dataset.mobileMenuInitialized = "true";
  let open = false;

  const setOpen = (nextOpen: boolean, restoreFocus = false) => {
    open = nextOpen;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    menu.style.maxHeight = open ? `${menu.scrollHeight}px` : "0";
    bar1.style.transform = open ? "translateY(6.5px) rotate(45deg)" : "";
    bar2.style.opacity = open ? "0" : "1";
    bar3.style.transform = open ? "translateY(-6.5px) rotate(-45deg)" : "";

    if (!open && restoreFocus) button.focus();
  };

  setOpen(false);
  button.addEventListener("click", () => setOpen(!open));
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && open) setOpen(false, true);
  });

  const desktopQuery = window.matchMedia("(min-width: 64rem)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches && open) setOpen(false);
  });
}
