import { writable } from 'svelte/store';

export const motors = writable<{ size: string, volume: number, surface: number }[]>([]);
export const undo = writable<{ size: string, volume: number, surface: number }[]>([]);