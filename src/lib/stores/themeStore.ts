import { writable } from "svelte/store";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";

export const theme = persist(writable("dark"), createLocalStorage(), "app-theme");
