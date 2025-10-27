import { writable } from "svelte/store";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";

export const hiddenAnnouncements = persist(writable<number[]>([]), createLocalStorage(), "hiddenAnnouncements");