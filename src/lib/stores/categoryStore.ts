import { writable } from "svelte/store";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";

export const selectedCategories = persist(writable(["News", "Reviews", "Guides", "Tutorials", "Misc"]), createLocalStorage(), "app-categories");