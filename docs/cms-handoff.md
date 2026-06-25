# CMS handoff: Cohetería Beauchef landing page

This is a handoff for the `git-backed-cms` branch. It summarizes the Pages CMS/static-content work and the current team-page modal/configuration session so another developer or AI agent can continue without rediscovering the repository.

## Source of truth

- The repository is the source of truth.
- Pages CMS is only an editing UI over repository files.
- CMS config: `.pages.yml`.
- Astro content schema: `src/content.config.ts`.
- Content files: `src/content/`.
- CMS media library: `public/media`, published as `/media`.

## CMS commit chain reviewed

Reviewed CMS-tagged commits:

- `e42d9fc [CMS] feat: add git-backed content workflow`
  - Added Pages CMS, Astro content collections, media scripts/workflows, and content-backed rendering helpers.
- `c0a473a [CMS] fix: support runner image conversion`
  - Adjusted media conversion/check scripts for GitHub runner uploads.
- `8526ef4 [CMS] fix: expose converted media library`
  - Made converted WebP assets visible in the CMS media library.
- `c66f186 [CMS] fix: expand editable content forms`
  - Expanded CMS forms; split sponsors and team into individual YAML entries.
- `1e80298 [CMS] fix: migrate legacy media library`
  - Moved legacy assets into `public/media` and updated references.
- `caf21dc [CMS] fix: remove instagram slug field`
  - Removed the CMS-facing Instagram slug workflow.
- `ec5165e [CMS] fix: restore hero image path`
  - Fixed the hero image path after media migration.

## Content model

### News / press

- Files: `src/content/news/*.md`
- CMS collection: `news`
- Loader helper: `getPressArticles(baseUrl)` in `src/data/content.ts`
- Supports draft filtering with `draft`.

### Projects

- Files: `src/content/projects/*.md`
- CMS collection: `projects`
- Loader helper: `getProjects(baseUrl)`
- Supports `logoSrc`, `videoUrl`, `gallery`, `model3dSrc`, `draft`, and body content.

### Instagram

- Files: `src/content/instagram/*.md`
- CMS collection: `instagram`
- Loader helper: `getInstagramPosts(baseUrl)`
- Fields: `order`, `postUrl`, `excerpt`, `likes`, `comments`, `imageSrc`, `imageAlt`.
- The slug field was intentionally removed; do not re-add unless the workflow changes.

### Sponsors

- Files: `src/content/sponsors/*.yml`
- CMS collection: `sponsors`
- Loader helper: `getSponsorLogos(baseUrl)`
- `heightClass` exists for manual logo sizing exceptions.

### Team

- Files: `src/content/team/*.yml`
- CMS collection: `team`
- Loader helper: `getTeamAreas(baseUrl)`
- `kind` controls placement:
  - `captain`: top student organigram cards.
  - `area`: student organigram leader cards and work-team cards.
  - `support`: work-team cards only.
  - `professor`: separate professor/support section.
- `membersMarkdown` is parsed into members. Prefer it over raw arrays for Pages CMS editing.
- `detailsMarkdown` controls the modal body. `TeamDialog.astro` supports simple headings, paragraphs, inline bold/code, and bullet lists.
- `coverImageSrc` controls the work-team card/modal image; it falls back to the page default image.

### Site settings

- File: `src/content/site/settings.yml`
- CMS collection: `settings`
- Existing object: `announcement`.
- New object: `teamPage`.

`teamPage` now controls the `/equipo` page-level settings:

```yml
teamPage:
  title: Conoce al equipo
  seoTitle: Equipo | Cohetería Beauchef
  seoDescription: Conoce al equipo de Cohetería Beauchef, estudiantes de la Universidad de Chile apasionados por la cohetería e ingeniería aeroespacial.
  studentOrgTitle: Organigrama estudiantil
  professorsTitle: Profesores de apoyo
  workTeamsTitle: Equipos de trabajo
  defaultImageSrc: /media/coheteriabeauchef_borderless_logo.webp
  defaultImageAlt: Logo de Cohetería Beauchef
  fallbackDescription: Detalle del equipo por completar.
  membersHeading: Integrantes
  fallbackMember: Integrantes por confirmar
  showCta: true
```

This makes the visible title, SEO title/description, section headings, default team image, fallback modal text, fallback member text, and bottom CTA visibility editable from Pages CMS.

## Current team page implementation

Main files:

- `src/pages/equipo.astro`
- `src/components/home/shared/TeamCard.astro`
- `src/components/home/shared/TeamDialog.astro`
- `src/data/content.ts`
- `src/content/team/*.yml`
- `src/content/site/settings.yml`

Current behavior:

- Captains and area leaders appear in the student organigram.
- Organigram leader cards do not show member lists, so repeated people do not appear twice there.
- Work-team cards show member names as a plain list and open a larger modal.
- Professors/support people are rendered in a separate section.
- Work-team modal content is Markdown-driven through `detailsMarkdown`.

Modal details:

- Native `<dialog>` was removed because close animation was unreliable; `dialog.close()` removed the open state immediately.
- The current modal is controlled with vanilla JS and CSS classes:
  - `.is-visible`: display the overlay.
  - `.is-open`: animate to visible state.
  - `.is-closing`: animate out before hiding.
- Opening is 400ms and uses a double `requestAnimationFrame` so the browser paints the hidden state before applying `.is-open`.
- Closing is 300ms.
- Roundness was reduced from `rounded-3xl` to `rounded-2xl`.
- A shadcn/Radix install was briefly attempted but removed; there is no retained dependency from that attempt.

## Media workflow

Intended flow:

1. Editors upload media through Pages CMS.
2. Files land in `public/media` and content references paths like `/media/file.png` or `/media/file.jpg`.
3. Run `pnpm media:build` to convert sources to WebP, update content references, and remove processed originals.
4. Run `pnpm media:check` before deploy.

Rules:

- Do not fake WebP by renaming files.
- Published image references should generally be `/media/...webp`.
- Keep images small; target around 300KB, and avoid exceeding the 500KB check threshold.

## Validation

Use:

```bash
pnpm check-types
pnpm build
pnpm media:check
```

After adding `teamPage`, `getHomeAnnouncement()` must narrow the site-settings union to the announcement shape. The current code does this.

## Future work

- Organigram connector lines are deferred. Use a package, SVG layer, or responsive CSS connector approach later instead of spending more time now.
- The team page is CMS-configurable at the content/settings level, but layout structure remains code-driven. Add section order/toggle settings only if non-dev editors need that.
- Instagram automation remains a placeholder until a reliable official integration path exists.
- Navigation labels/social URLs still live in `src/data/home.ts`; move them into CMS only if the team wants full non-developer control.
- Consider focus trapping for the custom modal if stricter accessibility requirements are needed.
