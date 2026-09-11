# Content architecture

The site uses SVX files for authored content and TypeScript loaders for
validation, ordering, and presentation-specific data. Content lives outside
`src/routes` so that routes stay focused on URLs and interaction.

## Responsibilities

```text
src/content/
├── pages/                 Generic content-page introductions
├── home/                  Landing-page sections
├── faq/                   FAQ sections and questions
└── builds/
    ├── catalog/           Cards shown on /builds
    └── guides/            Complete build guides
```

The corresponding loaders are:

| Content              | Loader                        | Public API                           |
| -------------------- | ----------------------------- | ------------------------------------ |
| Shared page metadata | `src/lib/content/metadata.ts` | `parsePageMetadata`                  |
| Home sections        | `src/lib/home/content.ts`     | `homeSections`                       |
| FAQ sections         | `src/lib/faq/content.ts`      | `faqSections`                        |
| Catalog cards        | `src/lib/catalog/content.ts`  | `getCatalogEntries`                  |
| Guides               | `src/lib/guides/content.ts`   | `getBuildGuide`, `getEquipmentGuide` |

The catalog and guide loaders each serve multiple content roots (`builds` and
`equipment`) from one implementation. The root is derived from each source
path; per-root configuration only supplies the search collection, section
label, and public URL base. Content roots without matching content simply
contribute nothing.

The systems are intentionally independent:

- A build catalog entry describes one card on `/builds`.
- A build guide describes one complete guide page.
- A guide does not need a catalog entry, and a catalog entry does not need a
  guide.
- Routes choose which content to render, but do not parse or cast frontmatter.

## How SVX is loaded

Each loader uses a literal `import.meta.glob` pattern. It receives compiled SVX
modules, validates their raw `metadata`, derives identifiers from file paths,
and sorts ordered collections.

Compiled content component fields use semantic names:

- `HomeSection.Content`
- `FaqSection.Content`
- `FaqQuestion.Content`
- `BuildCatalogEntry.Summary`
- `BuildGuide.Intro`
- `BuildGuideSection.Content`
- `BuildGuidePart.Content`

Do not add generic `component` fields or trust an `import.meta.glob` generic as
frontmatter validation. New loaders should use the readers in
`src/lib/content/metadata.ts`, which produce errors containing the source path
and invalid field.

## Identifier invariants

Several identifiers are derived from directory and file names:

- FAQ question: `<section-slug>-<question-slug>`
- Build guide part: `<guide-slug>-<section-slug>-<part-slug>`

These identifiers are public or persisted data:

- FAQ identifiers are used as DOM IDs and URL hashes.
- Build part identifiers are stored in the user's shopping list.

Renaming an FAQ section/question or a published guide/section/part is therefore
a migration, not a cosmetic file rename.

All slugs written by the development endpoints must match
`^[a-z0-9-]+$`.

## Build-guide editor boundary

Production guide types contain compiled content only. Raw SVX bodies and
serialization live under:

```text
src/lib/build-guides/editor/
├── frontmatter.ts
├── part.ts
├── section.ts
└── source.ts
```

Development endpoints use `src/lib/server/build-guides/files.ts` for canonical,
contained filesystem paths. Do not construct guide filesystem paths directly
inside endpoints or use string-prefix checks for containment.

See [Content authoring](./content-authoring.md) for step-by-step recipes and
frontmatter reference.
