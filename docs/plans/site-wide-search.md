# Add Site-Wide Search

## Summary

Add client-side full-text search with `MiniSearch`. The index will cover pages,
FAQ answers, build guides and parts, equipment lists, and future blog posts.

`MiniSearch` is preferred over Pagefind because content is frequently authored
through the Vite development server. Search results should update through normal
hot-module replacement without requiring a production build or a second
indexing process.

The expected collection—several build and equipment lists plus a blog—will
remain small enough to search entirely in the browser. A hosted search service
is not required.

## Implementation

### 1. Create a shared search document model

Define a normalized document containing:

- A stable ID derived from its content path or existing content identifier.
- Title, body, description, keywords, and optional section name.
- Destination URL, including a heading hash where appropriate.
- A collection discriminator such as `page`, `faq`, `build`, `equipment`, or
  `blog`.

Keep content-specific URL and metadata construction in each feature's loader.
The search feature should consume normalized documents rather than understand
every SVX directory layout.

### 2. Collect searchable content

Extend the existing content loaders to expose search documents alongside their
rendered SVX components. Use eager `import.meta.glob` raw-source imports where
the complete body text is needed.

Convert SVX source to plain searchable text while excluding frontmatter, Svelte
component syntax, navigation, editor controls, and other non-content markup.
Preserve useful product names, model numbers, headings, tags, and prices.

During development, rebuild the complete document collection whenever Vite
invalidates a content module. Rebuilding is simpler and less error-prone than
incrementally synchronizing edits, additions, deletions, and renamed files at
the expected collection size.

### 3. Build and load the MiniSearch index

Configure MiniSearch to:

- Index title, keywords, section, description, and body.
- Boost title and keyword matches above body matches.
- Enable prefix matching and conservative fuzzy matching.
- Store the fields needed to render and navigate to a result.

Build the index lazily when search is first opened so it does not affect the
initial page load. If production indexing becomes noticeable as content grows,
serialize the same index during `bun run build` and load the generated JSON
instead. Development should continue to build directly from Vite content
modules for immediate updates.

### 4. Add the global search interface

Add an accessible search dialog available from the shared site layout:

- A visible search button and `Ctrl/Cmd+K` keyboard shortcut.
- Debounced search-as-you-type results grouped or labelled by collection.
- Highlighted titles and short excerpts without rendering unsafe source HTML.
- Keyboard navigation, clear empty/loading states, and restored focus on close.
- Direct navigation to pages, FAQ questions, guide sections, and individual
  entries through stable URLs and hashes.

Keep the dialog visually consistent with the existing sidebar and Skeleton
theme, but keep search state local to the search feature.

## Validation

- Add unit tests for SVX-to-plain-text conversion, document IDs, URL generation,
  field weighting, fuzzy matching, and collection filtering.
- Verify that editing, adding, deleting, and renaming an SVX file updates search
  results without restarting `bun run dev`.
- Verify keyboard and screen-reader behavior for opening, searching, navigating,
  and closing the dialog.
- Check representative results from every content collection, including model
  numbers and deep links.
- Run `bun test`, `bun run check`, and `bun run build`.
- Run the Svelte autofixer on every changed `.svelte` file until no issues or
  suggestions remain.

## Future thresholds

Continue with MiniSearch while content is deployment-backed and fits comfortably
in a client-loaded index. Reconsider Orama if structured facets or numeric
filtering become a major requirement. Reconsider a hosted engine only if content
must update independently of deployments, the index grows to many thousands of
substantial documents, or managed analytics and ranking become necessary.
