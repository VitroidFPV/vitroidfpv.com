import { parts } from "$components/buildsPage/stores";

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

	// if category is "Motors", the added part quantity should be 4
	if (category === "Motors") {
		quantity = 4;
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
			}
		}

		return existingParts;
	});

	// console.log(parts)
}
