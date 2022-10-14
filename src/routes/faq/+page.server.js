import * as dotenv from 'dotenv'
dotenv.config()

const NETLIFY_API_KEY = process.env.NETLIFY_API_KEY

var upvotes = async() => {
	let response = await fetch ("https://api.netlify.com/api/v1/forms/633def84b40b9d0008711757/submissions", 
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

var deltaVotes = upvotes()

/** @type {import('./$types').PageServerLoad} */
export function load() {
	console.log(deltaVotes)
	return {
		votes: deltaVotes,
	}
}