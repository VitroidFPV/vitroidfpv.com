import { parts } from "$lib/stores/buildsStore";
import toast from 'svelte-french-toast';

interface Part {
	title: string;
	price: string;
	color: string;
	category: string;
	url: string;
	quantity: number;
	href: string;
}

type PartsMap = Record<string, Part[]>;

export function addPart(title: string, price: string, color: string, category: string, url: string, href: string) {
	let quantity = 1;

	if (category === "Motors") {
		quantity = 5;
	}

	const part: Part = { title, price, color, category, url, quantity, href };
	// @ts-ignore
	parts.update((existingParts: PartsMap) => {
		if (!existingParts[url]) {
			existingParts[url] = [part];
		} else {
			const partExists = existingParts[url].some((existingPart) => existingPart.title === title);

			if (!partExists) {
				existingParts[url].push(part);
				toast.success("Added to Comparison!", {
					style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
					iconTheme: {
						primary: "#87cc52",
						secondary: "#000000",
					}
				});
			}
		}

		return existingParts;
	});
	// console.log(parts)
}
