import { writable } from 'svelte/store';

export const selected = writable("");

export const component = writable<{selected: string, hovered: string, coords:[number, number, number]}>({selected: "", hovered: "", coords: [2, 2.5, 5]});