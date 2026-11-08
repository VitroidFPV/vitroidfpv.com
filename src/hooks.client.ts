import { dev } from "$app/environment"
import type { ClientInit } from "@sveltejs/kit"
import posthog from "posthog-js"

export const init: ClientInit = () => {
	if (dev) return

	posthog.init("phc_myPxqS3Z8eKJEP27mRg0w2F8k9VUEIRF60kJyqmM3gj", {
		api_host: "https://us.i.posthog.com",
		ui_host: "https://us.posthog.com",
		capture_pageview: "history_change"
	})
}
