/** @type {import('./$types').PageLoad} */
export function load({ data }) {
	return {
		votes: data.votes,
	};
}

// enable preloading
export const prerender = true;