import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

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

export const parts: Writable<PartsMap> = writable({});