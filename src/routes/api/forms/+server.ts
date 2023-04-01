import * as dotenv from "dotenv"
dotenv.config()

import { NETLIFY_API_KEY } from "$env/static/private"

async function upvotes(id: string) {
	let response = await fetch (`https://api.netlify.com/api/v1/forms/${id}/submissions`,
		{
			method: "get",
			headers: {
				"Authorization": ("Bearer " + NETLIFY_API_KEY)
			}
		}
	)
	let data = await response.json()
	let novoted = data.length
	let upvoted = 0
	for (let i = 0; i < data.length; i++) {
		if (data[i].data.Useful === "on") {
			upvoted++
		}
	}
	let downvoted = novoted - upvoted
	let deltaVotes = upvoted - downvoted
	return deltaVotes
}

export const GET = async (req) => {
	const params = new URLSearchParams(req.url.search);
	const id = params.get("id");
	if (!id) {
		throw new Error("No id provided");
	}
	let deltaVotes = await upvotes(id)
	let data = JSON.stringify({votes: deltaVotes})
	return new Response(data, {
		headers: {
			// type is json
			"Content-Type": "application/json",
			},
		}
	)
}