async function getData(url) {
	let response = await fetch(url)
	let data = await response.text()
	return data
}

// console.log(getData("https://scp-wiki.wikidot.com/scp-7400"))

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const params = new URLSearchParams(url.search);
	console.log(params)
	let adress = params.get('url')

	return new Response(await getData(adress), {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
		}
	})
}