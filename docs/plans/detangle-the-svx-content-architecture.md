# Detangle the SVX Content Architecture

## Summary

Separate the site’s content systems by responsibility while preserving all public URLs, rendered content, SEO, ordering, and interactive behavior.

The key boundary will be:

- `build-catalog`: cards displayed on `/builds`
- `build-guides`: individual guide pages, sections, parts, images, and editor support
- `content`: shared SVX metadata validation and the generic content-page shell
- `home` and `faq`: independent feature-owned loaders

The existing `/builds/5inch-beginner` route remains explicit. Its guide will no longer depend on a catalogue entry.

## Target content structure

```text
src/content/
├── pages/
│   ├── ai.svx
│   ├── articles.svx
│   ├── builds.svx
│   ├── equipment.svx
│   ├── faq.svx
│   ├── projects.svx
│   └── tools.svx
├── home/
│   └── *.svx
├── faq/
│   └── section-*/
│       ├── section.svx
│       └── question-*.svx
└── builds/
    ├── catalog/
    │   ├── 5inch-beginner.svx
    │   ├── 5-inch-advanced.svx
    │   └── 7-8-inch-lr.svx
    └── guides/
        └── 5inch-beginner/
            ├── guide.svx
            ├── images/
            └── sections/
                └── <section-slug>/
                    ├── section.svx
                    └── <part-slug>.svx
```

`5inch-beginner` becomes the canonical internal identifier because it matches the preserved public route. Existing content and any worktree changes will be retained during file moves.

## Implementation

### 1. Add shared SVX infrastructure

Create `src/lib/content/metadata.ts` containing:

- The common compiled SVX module type.
- Small metadata-reading helpers for required/optional strings, numbers, booleans, arrays, and records.
- Consistent errors containing the source SVX path and invalid field.
- `PageMetadata` parsing for `title`, `description`, and `seoDescription`.

Add `$content: "src/content"` beside the existing `$components` alias.

Create `src/components/content/ContentPage.svelte` to:

- Accept raw SVX metadata, a `Content` component, optional `ghostTitleClass`, and optional children.
- Validate the metadata once.
- Render `PageWrapper` and the SVX body without route-level casts.
- Support both simple content-only pages and pages such as FAQ/builds that append interactive children.

Move route-local SVX files into `src/content/pages`. Update every route to import semantically named `PageContent` rather than the copied `FaqContent` name.

### 2. Normalize the home and FAQ loaders

Rename:

- `src/lib/home/sections.ts` → `src/lib/home/content.ts`
- `src/lib/faq/sections.ts` → `src/lib/faq/content.ts`

For both loaders:

- Validate frontmatter instead of trusting `import.meta.glob` generic parameters.
- Name rendered component properties `Content` rather than `component`.
- Keep the existing exported ordered collections: `homeSections` and `faqSections`.
- Preserve the `age` prop accepted by the home About content.

For FAQ specifically:

- Rename each `metadata.svx` to `section.svx`.
- Throw on orphan questions or duplicate section/question identifiers instead of silently dropping or overwriting content.
- Move URL construction into `src/lib/faq/links.ts` as `getFaqQuestionUrl`.
- Keep FAQ DOM IDs, hashes, deep-link behavior, and copied URLs unchanged.

### 3. Extract the build catalogue feature

Create a standalone `src/lib/build-catalog` feature:

```text
src/lib/build-catalog/
├── content.ts
├── types.ts
├── theme.ts
├── icons.ts
└── models.ts
```

Rename the current concepts as follows:

- `BuildSection` → `BuildCatalogEntry`
- `BuildFeature` → `BuildCatalogSpec`
- `BuildColor` → `BuildCatalogAccent`
- `buildSections` → `buildCatalogEntries`
- Frontmatter `url` → `href`
- Frontmatter `features` → `specs`
- Rendered `component` → `Summary`

Move catalogue-specific colors, icons, and 3D model definitions into this feature. Unknown supplied accent, icon, or model identifiers will produce path-aware build errors; omitted optional values retain their current defaults.

Rename and move:

- `src/components/ListShowcase.svelte`
- to `src/components/build-catalog/BuildCatalogCard.svelte`

`BuildCatalogCard` will accept a single `entry: BuildCatalogEntry` prop instead of a parallel list of title, price, model, color, features, and component props.

The `/builds` page will consume only `buildCatalogEntries`. Catalogue entries without `href` remain non-clickable.

### 4. Make build guides independent

Create:

```text
src/lib/build-guides/
├── content.ts
├── types.ts
├── tags.ts
├── theme.ts
└── editor/
    ├── frontmatter.ts
    ├── part.ts
    ├── section.ts
    └── source.ts
```

Move the current guide loader out of `guide-sections.ts`.

Introduce:

- `BuildGuide`
- `BuildGuideSection`
- `BuildGuidePart`
- `BuildGuidePartTag`
- `BuildGuidePartAccent`
- `getBuildGuide(guideSlug)`

`getBuildGuide("5inch-beginner")` will return the typed guide metadata, `Intro` component, ordered sections, and ordered parts as one aggregate. `BuildGuidePage` will no longer call or import anything from `build-catalog`.

Create `guide.svx` with guide-only metadata:

- `title`
- `subtitle`
- `seoDescription`
- `seoImage`

Its body becomes the guide introduction. Initially, the current beginner-build body will be copied into both the catalogue summary and guide intro so rendered copy remains unchanged while allowing them to diverge later.

The guide loader will:

- Use the new literal glob paths.
- Resolve images from the guide’s own `images` directory.
- Throw for unknown part accents, missing referenced images, malformed tags, duplicate identifiers, and parts whose section does not exist.
- Preserve existing part IDs such as `5inch-beginner-frames-tbs-source-one-v5`, protecting persisted shopping-list data.
- Keep optional part images and prices optional.

Raw SVX bodies used by the development editor will move to `editor/source.ts`; production content types will no longer expose editor-only `body` fields.

### 5. Clarify build-guide component ownership

Move `src/components/BuildGuide` to `src/components/build-guides`.

Keep presentation components such as `PartCard`, `PartImage`, and `SectionHeading`, while making these naming improvements:

- `ListPopup.svelte` → `GuideShoppingList.svelte`
- `DevPartCard.svelte` → `editor/EditablePartCard.svelte`
- `DevSectionHeading.svelte` → `editor/EditableSectionHeading.svelte`
- Editor-only image controls move under the same `editor` directory.

Update all imports to use `$lib/build-guides` types and utilities. Shopping-list behavior, quantity rules, local-storage key, development `?public` switch, and visual markup remain unchanged.

### 6. Consolidate editor serialization and filesystem paths

Move part/section serialization into `src/lib/build-guides/editor`.

Extract the duplicated YAML scalar quoting into `editor/frontmatter.ts`. Keep the current frontmatter output format and tag input syntax.

Create `src/lib/server/build-guides/files.ts` for:

- The canonical guide content root.
- Slug validation.
- Safe guide, section, part, and image path construction.
- Directory-existence checks.
- Containment verification using `path.relative`, avoiding fragile string-prefix checks.

Keep the existing development endpoint URLs, but rename request fields internally:

- `buildSlug` → `guideSlug`
- `slug` → `partSlug`
- `previousSlug` → `previousPartSlug`

Update returned filesystem paths to the new `src/content/builds/guides/...` structure. Preserve all development-only guards, status codes, image limits, SSRF protection, rename behavior, and delete behavior.

### 7. Remove obsolete names and compatibility layers

Delete the superseded modules after every consumer has migrated:

- `src/lib/builds/sections.ts`
- `src/lib/builds/guide-sections.ts`
- Old build serializer modules
- Old build-only colors/icons/models modules
- `ListShowcase.svelte`
- The old `BuildGuide` component directory
- Route-local page SVX files

Do not leave re-export shims: repository-wide searches should find no imports from the old paths and no remaining ambiguous `BuildSection`, `BuildFeature`, `FaqContent`, or generic `component` content fields.

## Public interfaces and type changes

The important module-facing API becomes:

```ts
buildCatalogEntries: BuildCatalogEntry[]

getBuildGuide(guideSlug: string): BuildGuide

homeSections: HomeSection[]
faqSections: FaqSection[]

getFaqQuestionUrl(url: URL, questionId: string): string
```

Semantic component fields will be PascalCase:

- `BuildCatalogEntry.Summary`
- `BuildGuide.Intro`
- `HomeSection.Content`
- `FaqSection.Content`
- `FaqQuestion.Content`

No public HTTP page URL or FAQ hash changes.

## Tests and acceptance scenarios

Add Bun unit tests for:

- Required and optional metadata parsing.
- Path-aware validation errors.
- Part tag parsing and editor tag formatting.
- YAML quoting and part/section serialization.
- Slug rejection and safe server path construction.
- Preservation of stable guide part IDs.

Validation commands:

- `bun test`
- `bun run check`
- `bun run build`
- Svelte autofixer on every changed `.svelte` file until it reports no issues.
- Targeted Prettier and ESLint checks for changed files.

Acceptance checks:

- `/` renders all home sections in the same order and still supplies `age`.
- Every simple content page retains its title, subtitle, body, SEO, and ghost-title styling.
- `/faq` retains ordering, accordion behavior, hashes, scrolling, and copied links.
- `/builds` retains all three cards, order, styling, models, specs, and link state.
- `/builds/5inch-beginner` retains its URL, SEO, intro, ordered sections and parts, images, tags, shopping list, quantities, and stored selections.
- Development editor controls still generate, save, rename, move, delete, and download against the new guide paths.
- Invalid content fails loudly during checking/building rather than disappearing silently.

## Assumptions and defaults

- This is an architectural refactor with no intended visual or copy changes.
- Public routes, FAQ hashes, external product links, API endpoint URLs, and local-storage keys remain stable.
- The explicit `src/routes/builds/5inch-beginner/+page.svelte` route remains; no dynamic `[slug]` route is introduced.
- No schema-validation dependency will be added; lightweight local validators are sufficient.
- The current production build and type-check baseline is green.
