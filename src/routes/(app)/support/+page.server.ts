// import type { PageServerLoad } from './$types';
// // export const load = (async ({ data }) => {
// // 	let mdFile = await fetch("/modules/articles/support.md");
// // 	let md = await mdFile.text();
// // 	return {
// // 		md: md,
// // 	};
// // }) satisfies PageLoad

// export const load = (async ({ fetch }) => {
// 	let modules = import.meta.glob("/modules/support/*.md");

// 	// for each module, fetch the md file and return it
// 	// without using resolver
// 	let data = {};
// 	for (const [path, resolver] of Object.entries(modules)) {
// 		let mdFile = await fetch(path);
// 		let md = await mdFile.text();
// 		data[path] = md;
// 	}

// 	return {
// 		md: data,
// 	};

// }) satisfies PageServerLoad