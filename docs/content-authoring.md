# Content authoring

This guide covers adding and editing pages, landing-page sections, FAQ entries,
build catalog cards, and build guides.

## SVX basics

An SVX file contains YAML frontmatter followed by Markdown. Svelte markup and
components can also be used in the body.

```svx
---
title: Example
order: 1
---

Markdown content goes here.
```

Frontmatter is validated during development, checking, and building. Invalid
fields, duplicate identifiers, orphan content, unknown theme values, and
missing guide images fail loudly with the source path.

Section descriptor files are named `_section.svx`. The underscore prefix keeps
them above the section's regular content files in alphabetically sorted editor
trees.

After changing content, run:

```sh
bun test
bun run check
bun run lint
bun run build
```

## Add a regular page

Regular pages combine an SVX introduction with the shared page shell.

1. Add `src/content/pages/<page-slug>.svx`:

   ```svx
   ---
   title: Page title
   description: Short subtitle shown below the title
   seoDescription: Search and social description
   ---

   Introductory page content.
   ```

2. Add `src/routes/<page-slug>/+page.svelte`:

   ```svelte
   <script lang="ts">
   	import ContentPage from "$components/content/ContentPage.svelte"
   	import PageContent, { metadata } from "$content/pages/<page-slug>.svx"
   </script>

   <ContentPage
   	{metadata}
   	source="src/content/pages/<page-slug>.svx"
   	Content={PageContent}
   />
   ```

`title` and `description` are required. `seoDescription` is optional and falls
back to the visible description through `PageWrapper`.

Use the optional `ghostTitleClass` prop when a title needs different background
text sizing:

```svelte
<ContentPage
	{metadata}
	source="src/content/pages/<page-slug>.svx"
	Content={PageContent}
	ghostTitleClass="text-[12rem] md:text-[16rem]"
/>
```

Interactive pages can put additional markup inside `ContentPage`. See the FAQ
and builds routes for examples. Keep interaction in the route or feature
components, not in the shared page SVX file.

Adding the route does not automatically add navigation, sitemap, or home-page
links. Update those separately when the page should be discoverable.

## Add a home section

Add `src/content/home/<section-slug>.svx`:

```svx
---
title: Section title
order: 7
---

### Section heading

Section content.
```

Home sections are discovered automatically and sorted by `order`. Both fields
are required. Use unique order values to make the intended order explicit.

The home page passes an `age` prop to every section. A section that needs it can
declare:

```svelte
<script lang="ts">
	let { age }: { age: number } = $props()
</script>
```

## Add FAQ content

FAQ content is grouped by section:

```text
src/content/faq/<section-slug>/
├── _section.svx
├── <question-slug>.svx
└── another-question.svx
```

Create the section description:

```svx
---
title: Section title
order: 1
---

Optional section description.
```

Create each question:

```svx
---
title: The visible question?
order: 1
---

The answer.
```

Sections and questions are sorted independently by `order`. A question without
a matching `_section.svx` is rejected.

The question's URL hash and DOM ID are derived as:

```text
<section-slug>-<question-slug>
```

For example,
`src/content/faq/getting-started/how-much-does-it-cost.svx` becomes
`/faq#getting-started-how-much-does-it-cost`. Do not rename published FAQ
directories or question files without preserving or migrating existing links.

## Add a build catalog card

Catalog cards displayed on `/builds` live in:

```text
src/content/builds/catalog/<entry-slug>.svx
```

Gear catalog cards displayed on `/equipment` live in
`src/content/equipment/catalog/<entry-slug>.svx` and use the same frontmatter,
except that `useModel` is ignored — set `model` explicitly to show a 3D model.

Example:

```svx
---
title: 5" Example
price: "~$250"
order: 1
image: /builds/example.svg
href: /builds/example
description: Short guide-page subtitle
seoDescription: Longer search and social description
model: s1v5
color: success
specs:
  - title: Weight
    description: 600-900g
    icon: weight
  - title: Flight Time
    description: ~5-10 min
    icon: battery
---

The summary shown inside the catalog card.
```

Required fields:

| Field   | Meaning                      |
| ------- | ---------------------------- |
| `title` | Card title                   |
| `price` | Display price or price range |
| `order` | Position on `/builds`        |
| `image` | Static fallback image URL    |
| `specs` | List of card specifications  |

Each spec requires `title` and `description`. Its `icon` is optional.

Optional fields:

| Field            | Meaning                                                         |
| ---------------- | --------------------------------------------------------------- |
| `href`           | Internal destination; omit it for a non-clickable card          |
| `description`    | Not required by the catalog; useful when related copy is needed |
| `seoDescription` | Not required by the catalog                                     |
| `model`          | 3D model identifier                                             |
| `useModel`       | Uses the default `s1v5` model when true and `model` is omitted  |
| `color`          | Card accent; defaults to `success`                              |

Supported catalog values:

- Accents: `success`, `warning`, `error`
- Icons: `weight`, `ruler`, `battery`, `signal`
- Models: `s1v5`, `flipmode`, `mario8`

Unknown supplied values are build errors. To add another icon, model, or accent,
update the corresponding module in `src/lib/build-catalog`.

Use `success` whenever an accent intentionally means green, positive, easiest,
or lowest-cost. `primary` is reserved for brand and interaction styling; do not
use it as a value-range alias for green.

## Add a build guide

Build guides live independently from catalog cards:

```text
src/content/builds/guides/<guide-slug>/
├── guide.svx
├── images/
└── sections/
    └── <section-slug>/
        ├── _section.svx
        └── <part-slug>.svx
```

Use lowercase, hyphenated slugs. The guide slug should match its public route
segment.

### 1. Create guide metadata and introduction

Add `guide.svx`:

```svx
---
title: 5" Example
subtitle: Cheap, durable, and easy to repair
seoDescription: A complete example FPV build guide.
seoImage: /builds/example.svg
---

The guide introduction.
```

`title` and `subtitle` are required. `seoDescription` and `seoImage` are
optional.

### 2. Create a section

Add `sections/<section-slug>/_section.svx`:

```svx
---
title: Frames
order: 1
---

Advice that applies to the whole section.
```

Both fields are required.

### 3. Add parts

Add one SVX file per part beside `_section.svx`:

```svx
---
title: Example Frame
url: https://example.com/product
order: 1
color: success
price: $29.99
image: example-frame.jpg
imageAlt: Example Frame viewed from above
tags:
  - 145g
  - 4mm Arms
  - "3/2mm Plates<Bottom/Top>"
---

The part description and recommendation.
```

Required part fields:

| Field   | Meaning                     |
| ------- | --------------------------- |
| `title` | Product name                |
| `url`   | External product URL        |
| `order` | Position within the section |
| `color` | Part accent                 |

Optional part fields:

| Field      | Meaning                                       |
| ---------- | --------------------------------------------- |
| `price`    | Display price used by the shopping-list total |
| `image`    | Filename from the guide's `images` directory  |
| `imageAlt` | Image alternative text; defaults to `title`   |
| `tags`     | Product attributes and optional tooltips      |

Supported part accents are `success`, `warning`, `error`, and `secondary`.

Tags use `Label<Tooltip>` when an explanation is needed. Quote tags containing
YAML-sensitive characters. Empty or malformed angle-bracket syntax is rejected.

Supported guide image extensions are AVIF, GIF, HEIF, JPEG/JPG, PNG, TIFF, and
WebP. A referenced file must exist in the same guide's `images` directory.

### 4. Add the route

Guide routes are explicit. Add
`src/routes/builds/<guide-slug>/+page.svelte`:

```svelte
<script lang="ts">
	import BuildGuidePage from "$components/build-guides/BuildGuidePage.svelte"
</script>

<BuildGuidePage guideSlug="<guide-slug>" />
```

Add a catalog entry with `href: /builds/<guide-slug>` only when the guide should
also appear as a clickable card on `/builds`.

### Stable guide IDs

A part ID is derived as:

```text
<guide-slug>-<section-slug>-<part-slug>
```

It is persisted in the browser's shopping-list data. Renaming a published
guide, section directory, or part file changes that ID and can invalidate saved
selections. Preserve published slugs unless the change includes a data
migration.

## Use the development build-guide editor

In development, a guide page shows editing controls automatically:

```text
http://localhost:3000/builds/<guide-slug>
```

Append `?public` to hide editor controls and preview the public presentation:

```text
http://localhost:3000/builds/<guide-slug>?public
```

The editor can:

- add and edit sections;
- rename or reorder sections;
- delete a section and all of its parts;
- add and edit parts;
- move, rename, and reorder parts;
- search for a part image or download one directly from a public URL.

Editor saves write directly to `src/content/builds/guides`. Refresh after a
successful save to load the rebuilt content modules. Image search results come
from third parties; confirm usage rights before publishing an image.

The filesystem-writing endpoints are development-only. Do not remove their
`dev` guards.

## Troubleshooting

- A missing image error means the part's `image` value does not exactly match a
  file under that guide's `images` directory.
- An orphan error means a question, section, or part is outside its required
  parent structure.
- An unknown accent, icon, or model must be corrected or registered in its
  feature module.
- A duplicate identifier usually means two discovered files derive the same
  slug.
- When a new file is not discovered, confirm that its location and filename
  match the literal glob layouts documented above.
