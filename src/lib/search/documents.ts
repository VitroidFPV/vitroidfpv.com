import { catalogSearchDocuments } from "../catalog/content"
import { articleSearchDocuments } from "../articles/content"
import { guideSearchDocuments } from "../guides/content"
import { pageSearchDocuments } from "../content/pages"
import { faqSearchDocuments } from "../faq/content"
import type { SearchDocument } from "./types"

export const siteSearchDocuments: SearchDocument[] = [
	...pageSearchDocuments,
	...articleSearchDocuments,
	...faqSearchDocuments,
	...catalogSearchDocuments,
	...guideSearchDocuments
]
