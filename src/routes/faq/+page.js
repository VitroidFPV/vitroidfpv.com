/** @type {import('./$types').PageLoad} */
export function load({ data }) {
	return {
		votes: data.votes,
	};
}