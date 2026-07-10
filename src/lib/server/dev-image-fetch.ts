import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

const maxRedirects = 5

function isPrivateAddress(address: string): boolean {
	const normalized = address.toLowerCase().split("%")[0]

	if (isIP(normalized) === 4) {
		const parts = normalized.split(".").map(Number)
		return (
			parts[0] === 0 ||
			parts[0] === 10 ||
			parts[0] === 127 ||
			(parts[0] === 169 && parts[1] === 254) ||
			(parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
			(parts[0] === 192 && parts[1] === 168) ||
			parts[0] >= 224
		)
	}

	if (isIP(normalized) === 6) {
		return (
			normalized === "::" ||
			normalized === "::1" ||
			normalized.startsWith("fc") ||
			normalized.startsWith("fd") ||
			normalized.startsWith("fe8") ||
			normalized.startsWith("fe9") ||
			normalized.startsWith("fea") ||
			normalized.startsWith("feb") ||
			normalized.startsWith("::ffff:127.") ||
			normalized.startsWith("::ffff:10.") ||
			normalized.startsWith("::ffff:192.168.")
		)
	}

	return true
}

async function assertPublicUrl(value: string): Promise<URL> {
	let url: URL
	try {
		url = new URL(value)
	} catch {
		throw new Error("Invalid remote image URL")
	}

	if (url.protocol !== "https:" && url.protocol !== "http:") {
		throw new Error("Unsupported remote image URL")
	}

	const addresses = await lookup(url.hostname, { all: true })
	if (
		addresses.length === 0 ||
		addresses.some(({ address }) => isPrivateAddress(address))
	) {
		throw new Error("Remote image host is not public")
	}

	return url
}

export async function fetchPublicUrl(
	value: string,
	init: RequestInit = {},
	redirects = 0
): Promise<Response> {
	if (redirects > maxRedirects) {
		throw new Error("Too many remote image redirects")
	}

	const url = await assertPublicUrl(value)
	const response = await fetch(url, {
		...init,
		redirect: "manual",
		signal: init.signal ?? AbortSignal.timeout(10_000)
	})

	if (response.status >= 300 && response.status < 400) {
		const location = response.headers.get("location")
		if (!location) throw new Error("Invalid remote image redirect")

		return fetchPublicUrl(new URL(location, url).href, init, redirects + 1)
	}

	return response
}
