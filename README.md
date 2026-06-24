# coheteria-beauchef-landing

Landing estatica simple con Astro, Tailwind CSS y animaciones GSAP.

## Scripts

- `pnpm dev`: inicia el servidor de desarrollo
- `pnpm build`: genera la version estatica
- `pnpm preview`: previsualiza el build
- `pnpm media:build`: convierte PNG/JPEG temporales desde `uploads/originals/` a WebP en `public/media/` y elimina los originales
- `pnpm media:check`: valida que el contenido use WebP y que no queden fuentes PNG/JPEG temporales trackeadas
- `pnpm instagram:update`: placeholder para automatizar posts cuando exista una integración confiable con Instagram/Meta
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

El contenido editable vive en archivos Markdown/YAML bajo `src/content/`. Astro valida esos archivos al construir el sitio. La idea es que el sitio funcione como un CMS estatico: se editan archivos, se revisan en GitHub, Astro construye HTML/CSS/JS estatico y el pipeline lo despliega.

- Noticias/prensa: `src/content/news/*.md`
- Proyectos: `src/content/projects/*.md`
- Posts destacados de Instagram: `src/content/instagram/*.md`
- Equipo: `src/content/team/areas.yml`
- Sponsors y anuncio superior: `src/content/site/`

El archivo `.pages.yml` prepara estos archivos para editarlos desde Pages CMS sin levantar WordPress ni una base de datos.

### Como funciona ahora

1. Una persona edita contenido desde Pages CMS o directamente en GitHub.
2. El cambio queda como archivos Markdown/YAML dentro del repositorio.
3. Si hay imagenes nuevas, Pages CMS las sube temporalmente como PNG/JPEG a `uploads/originals/` y escribe una ruta tipo `/media/foto.png` en el contenido.
4. Se ejecuta `pnpm media:build` para crear los WebP finales en `public/media/`, cambiar las referencias a `/media/foto.webp` y borrar esos PNG/JPEG originales.
5. Se abre un PR hacia `main`. GitHub Actions corre validaciones y despliega staging en GitHub Pages cuando se mergea.
6. Cuando staging esta aprobado, se hace PR de `main` a `prod`; el workflow de produccion construye y copia el sitio estatico a Cipres.

El repositorio sigue siendo la fuente de verdad. Pages CMS solo es una interfaz mas amable para editar esos archivos.

### Reglas de contenido

- No editar listas grandes en `src/data/home.ts`; ese archivo queda para constantes compartidas y enlaces globales.
- Mantener `order` como numero entero para controlar el orden visual.
- Usar `draft: true` para preparar noticias o proyectos sin publicarlos.
- Las rutas de imagenes publicadas deben apuntar a WebP, por ejemplo `/media/proyectos/minerva.webp`.
- Para Instagram, el flujo es curado por RRSS: cada post vive en `src/content/instagram/*.md` con URL original del post, caption resumido, estadisticas visibles e imagen subida desde el CMS. La tarjeta del sitio usa esa URL original como destino al hacer click.

### Imágenes

- **Usar WebP de verdad**, no solo cambiar la extensión del archivo. Ponerle `.webp` a un JPEG o PNG no lo convierte mágicamente.
- Para convertir imágenes nuevas, deja PNG/JPEG temporales en `uploads/originals/` y ejecuta:
  ```bash
  pnpm media:build
  ```
- El script genera WebP en `public/media/`, actualiza referencias `/media/*.png` o `/media/*.jpg` dentro de `src/content/` a `/media/*.webp`, y elimina los PNG/JPEG originales procesados.
- Antes de deploy, `pnpm media:check` falla si quedan PNG/JPEG temporales trackeados o si el contenido apunta a imágenes que no sean WebP.
- Si alguien sube PNG/JPEG en un PR para que GitHub Actions los convierta, el commit final debe incluir solo los WebP generados y la eliminacion de los originales.
- Tamaño máximo recomendado: **~300KB** por imagen. El chequeo falla sobre `public/media/` si un WebP generado supera 500KB.
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
