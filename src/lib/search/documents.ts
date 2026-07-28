import { buildCatalogSearchDocuments } from "../build-catalog/content"
import { buildGuideSearchDocuments } from "../build-guides/content"
import { pageSearchDocuments } from "../content/pages"
import { faqSearchDocuments } from "../faq/content"
import type { SearchDocument } from "./types"

export const siteSearchDocuments: SearchDocument[] = [
	...pageSearchDocuments,
	...faqSearchDocuments,
	...buildCatalogSearchDocuments,
	...buildGuideSearchDocuments
]
