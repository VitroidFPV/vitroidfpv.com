async function getData(url: string) {
	let response = await fetch(url)
	let data = await response.text()
	return data
}

// console.log(getData("https://scp-wiki.wikidot.com/scp-7400"))

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }: { url: URL }) => {
	const params = new URLSearchParams(url.search);
	const address = params.get("url");
	if (!address) {
		throw new Error("No address provided");
	}
	const data = await getData(address);
	return new Response(data, {
		headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET",
		},
	});
};