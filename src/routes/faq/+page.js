const modules = import.meta.glob("/modules/faqs/*.md", {eager: true});
let grouped_modules = {};

for (const k in modules) {
	const cat = modules[k].metadata.Category;
	if (grouped_modules[cat]) {
		grouped_modules[cat].push(modules[k]);
	} else {
		grouped_modules[cat] = [modules[k]];
	}
}

/** @type {import('./$types').PageLoad} */
export function load({ data }) {
	return {
		votes: data.votes,
		serverModules: grouped_modules,
	};
}

// enable preloading
export const prerender = true;