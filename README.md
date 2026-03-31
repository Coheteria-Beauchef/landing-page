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

## Uso

```bash
pnpm install
pnpm dev
```
