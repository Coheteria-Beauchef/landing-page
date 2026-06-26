# Style updates handoff prompt

Use this prompt with a design-capable coding model.

## Context

You are working on the Coheteria Beauchef landing page repo:

- Repo path: `/home/fgonz/dev/landing-page`
- Current branch should be: `style-updates`
- Framework: Astro + Tailwind
- Existing CMS/content work is already implemented through:
  - `.pages.yml`
  - `src/content.config.ts`
  - `src/content/`
  - `src/data/content.ts`
- Do not break the git-backed CMS model. Prefer editable content in `src/content/` where the existing structure supports it.
- Do not add unnecessary fallbacks in TypeScript.

Important validation commands:

```bash
pnpm check-types
pnpm media:check
pnpm build
```

The current branch already builds before these style updates.

## Design source of truth

Read and follow this PDF:

```text
/home/fgonz/Downloads/coheteria-beauchef-assets/pagina web/assets-nuevos-web-cb/ideas_web_cb.pdf
```

The handwritten Comic Sans comments in the PDF are the requested corrections. Treat those comments as instructions, not decoration.

Also inspect these assets:

```text
/home/fgonz/Downloads/coheteria-beauchef-assets/pagina web/assets-nuevos-web-cb/logo_cb_horizontal.svg
/home/fgonz/Downloads/coheteria-beauchef-assets/pagina web/assets-nuevos-web-cb/parche_minerva_i.svg
/home/fgonz/Downloads/coheteria-beauchef-assets/pagina web/assets-nuevos-web-cb/monica.jpg
/home/fgonz/Downloads/coheteria-beauchef-assets/pagina web/assets-nuevos-web-cb/ruben.jpg
```

Note: `logo_cb_horizontal.svg` may be badly exported or visually empty. Verify before using it. If it is unusable, preserve the current logo behavior and document the issue rather than inventing a replacement.

## Requested changes from the PDF

### Header and hero

- Replace the current logo/header brand with the horizontal logo asset if the SVG is usable.
- The logo/brand must link back to the home page.
- Move the hero text upward enough that it does not cover faces in the background photo.
- Update the hero subtitle/copy to:

```text
Equipo de coheteria experimental, impulsamos la ingenieria y tecnologia aeroespacial
```

- Keep the hero usable on mobile and desktop. Do not let text overlap important faces.

### About section

- Update the about copy to:

```text
Somos un equipo estudiantil de la Facultad de Ciencias Fisicas y Matematicas de la Universidad de Chile, fundado en 2023.
Nos dedicamos al diseno, construccion y lanzamiento de cohetes experimentales.
En 2025 validamos nuestro primer motor disenado y desarrollado completamente por estudiantes.
```

- Remove the `2023` foundation-year stat because the year is now mentioned in the paragraph.
- Adjust the main heading so the idea reads as:

```text
Impulsando la ingenieria aeroespacial
```

- Keep “ingenieria aeroespacial” visually together and use the same blue emphasis for both words if the current design emphasizes one of them.

### Posts section

- Keep the posts section visually similar to the PDF.
- Add/keep a header nav item called `Posts` that points to the posts section.
- Posts should remain editable through the existing CMS/content workflow.
- Use publication links where supported by the current content model.
- Do not regress the fixed LASC image: `src/content/instagram/lasc-2026.md` should use `/media/post_ig_5.webp`.

### Sponsors section

- Rename the section title from `Auspiciadores` to:

```text
Sponsors
```

- Update the subtitle to:

```text
Agradecemos a quienes han creido en nuestro proyecto
```

### Team page

The PDF asks for the team page to be reorganized conceptually:

- First show professors/support.
- Then show the student leadership section as `Directiva`.
- Then show work teams lower on the page.
- The organization chart lines can be improved if practical, but do not spend disproportionate time on fragile connector lines.
- Work-team cards should show:
  - team name
  - members
  - a generic/photo-style image representing what the team does
  - a hover/modal/pop-up interaction explaining what the team does
- If official explanatory text for a team is missing, keep the existing `detailsMarkdown` or use a sober placeholder. Do not include informal PDF text such as “queda pendiente” or “blablabla” in production UI.

Respect the existing CMS-backed team model:

- `src/content/team/*.yml`
- `membersMarkdown`
- `detailsMarkdown`
- `coverImageSrc`
- `src/pages/equipo.astro`
- `src/components/home/shared/TeamCard.astro`
- `src/components/home/shared/TeamDialog.astro`

### Projects page

The PDF wants the `Proyectos` nav/page to show mission/project content.

Implement a mission-focused page or section using the existing `/proyectos` route:

- Heading:

```text
Misiones
```

- Add a mission card/section:

```text
Mision Minerva I
```

- Use the `parche_minerva_i.svg` asset for this mission.
- The official text is not final in the PDF. Use a clean temporary description, not the informal “blablabla” text.
- Keep this content compatible with the current project CMS structure if reasonable.

### Gallery/project media section

Add or design a section inspired by the PDF called:

```text
Nuestro Proyecto
```

It should support categories:

```text
Trabajo
Equipo
Eventos
```

The PDF suggests these should eventually lead to folders/galleries. For now, create a clean, extensible UI that can later become a real gallery. If real assets are missing, use existing relevant repo media rather than abstract gradients or fake imagery.

## Design constraints

- Keep the site polished and coherent with the existing Coheteria Beauchef visual identity.
- Preserve the strong blue/white identity.
- Use real imagery/assets where available.
- Avoid decorative blobs/orbs and unrelated abstract visuals.
- Keep typography consistent; do not literally use Comic Sans in the site.
- Maintain responsive layouts for mobile and desktop.
- Do not introduce large new dependencies unless clearly necessary.
- Keep cards reasonably tight; avoid nested card clutter.
- Do not hardcode content that should stay CMS-editable if the repo already has a content collection for it.

## Implementation approach

1. Inspect the current code before editing:
   - `src/data/home.ts`
   - `src/components/home/hero/HeroSection.astro`
   - `src/components/home/about/AboutSection.astro`
   - `src/components/home/instagram/InstagramSection.astro`
   - `src/components/home/sponsors/SponsorsSection.astro`
   - `src/pages/equipo.astro`
   - `src/pages/proyectos.astro`
   - `src/content/**`
2. Copy usable new assets into the repo under `public/media/` or an appropriate existing asset location.
3. Keep changes scoped to the style/content update requested by the PDF.
4. Run validation:

```bash
pnpm check-types
pnpm media:check
pnpm build
```

5. Use browser/devtools or screenshots to verify:
   - home hero desktop/mobile
   - posts section
   - sponsors section
   - team page
   - projects page

## Expected output

At the end, report:

- What changed by section.
- Which assets were used.
- Any PDF instruction that could not be implemented exactly and why.
- Validation command results.
- Current git status.
