import fs from "fs";
import pathModule from "path";
import { dev } from "$app/environment";
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// req will have a content, path, and name key
	if (dev) {
		const { content, path: filePath, name } = await request.json() as { content: string, path: string, name: string };

		const fullPath = `.${filePath}/${name}`;

		const directory = pathModule.dirname(fullPath);
		// fs.mkdirSync(directory, { recursive: true });

		// fs.writeFileSync(fullPath, content);

		// overwrite the file if it exists, otherwise create a new file
		fs.writeFileSync(fullPath, content, { flag: "w" });

		console.log(`Markdown file generated: ${fullPath}`);
	}
	return new Response(null, { status: 200 });
};
