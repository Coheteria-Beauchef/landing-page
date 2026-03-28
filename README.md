# coheteria-beauchef-landing

Landing estatica simple con Astro y Tailwind CSS.

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

## Uso

```bash
pnpm install
pnpm dev
```

## TypeScript Native Preview

- El proyecto incluye `@typescript/native-preview` para probar TS7 mediante `tsgo`.
- En VS Code, instala la extension `TypeScriptTeam.native-preview`.
- La configuracion del workspace ya deja activado `typescript.experimental.useTsgo`.
