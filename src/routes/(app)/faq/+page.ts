import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	return {
		votes: data.votes,
	};
}) satisfies PageLoad;

// enable preloading
export const prerender = true;