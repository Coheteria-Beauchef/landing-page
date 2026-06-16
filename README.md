# coheteria-beauchef-landing

Landing estatica simple con Astro, Tailwind CSS y animaciones GSAP.

## Scripts

- `pnpm dev`: inicia el servidor de desarrollo
- `pnpm build`: genera la version estatica
- `pnpm preview`: previsualiza el build
- `pnpm tsgo -- --help`: ejecuta el compilador nativo preview de TypeScript
- `pnpm check-types`: corre `astro check`
- `pnpm check-types:native`: corre `tsgo --noEmit`
- `pnpm check`: ejecuta Oxlint y Oxfmt

## Estructura

```text
.
|- public/
|- src/
|- astro.config.mjs
|- package.json
`- tsconfig.json
```

## Cambios Rápidos

En `src/components/data/home.ts`, donde aparece instagramPosts, puedes agregar, editar o eliminar posts. Solo asegúrate de mantener el formato correcto, dejar una imagen en public/ y actualizar.

Para colocar un anuncio en la parte superior de la página, edita el objeto `homeAnnouncement` en el mismo archivo. Puedes activar o desactivar el anuncio, cambiar el texto y el enlace. Útil para compartir eventos próximos.

Para cambiar los posts de instagram, edita el array `instagramPosts` en `src/components/data/home.ts`. Asegúrate de mantener el formato correcto y de que las imágenes estén en la carpeta `public/`.

### Imágenes

- **Usar WebP de verdad**, no solo cambiar la extensión del archivo. Ponerle `.webp` a un JPEG o PNG no lo convierte mágicamente.
- Para convertir una imagen a WebP real:
  ```bash
  convert imagen.jpg -resize 1920x -quality 85 imagen.webp
  ```
  (requiere ImageMagick)
- Tamaño máximo recomendado: **~300KB** por imagen. Si una imagen pesa más de 500KB, probablemente está mal optimizada.
- Resolución máxima: **1920px** de ancho para fotos, **~200px** para logos/favicons.
- Verificar que una imagen es WebP real:
  ```bash
  file imagen.webp
  # Debe decir "RIFF ... Web/P image", NO "JPEG" ni "PNG"
  ```
- Antes de commitear una imagen nueva, revisar su tamaño con `ls -lh`.


## Uso

```bash
pnpm install
pnpm dev
```

## Branches y Deploy

- **`main`** — rama de desarrollo. Cada push a `main` despliega automaticamente en **GitHub Pages** (dev/staging):
  https://coheteriabeauchef.github.io/landing-page/
- **`prod`** — rama de produccion. Cada push a `prod` construye y despliega en el servidor del CEC Uchile **cipres** via GitHub Actions.
  URL final (pendiente): `coheteriabeauchef.ing.uchile.cl`

### Flujo de trabajo

1. Desarrollar y probar en `main` → se ve en GitHub Pages
2. Cuando este listo, crear PR desde main hacia prod y mergear.
3. El pipeline de GitHub Actions (`deploy-prod.yml`) construye el sitio, lo sube a `~/landing-page/` en cipres, y fija los permisos.

> **Nota:** `astro.config.mjs` tiene configuraciones distintas en cada rama (`main` usa `base: /landing-page/`, `prod` usa `base: /`). El archivo `.gitattributes` en `prod` tiene `merge=ours` para que los merges automaticos preserven la config de produccion.
