import { browser } from "$app/environment"
import { createToaster } from "@skeletonlabs/skeleton-svelte"
import type { Options, StatusChangeDetails, Type } from "@zag-js/toast"

const storageKey = "vitroidfpv:toasts"
const restoreWindow = 60_000

const defaultDurations = {
	info: 5_000,
	error: 5_000,
	success: 2_000,
	warning: 5_000
} as const

type PersistedToast = {
	id: string
	type: keyof typeof defaultDurations
	title?: string
	description?: string
	duration: number
	expiresAt: number
}

export const toaster = createToaster({
	placement: "bottom-end",
	max: 5
})

function readPersistedToasts(): PersistedToast[] {
	if (!browser) return []

	try {
		const value = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]")
		if (!Array.isArray(value)) return []

		return value.filter(
			(toast): toast is PersistedToast =>
				typeof toast === "object" &&
				toast !== null &&
				typeof toast.id === "string" &&
				toast.type in defaultDurations &&
				typeof toast.duration === "number" &&
				typeof toast.expiresAt === "number" &&
				toast.expiresAt > Date.now()
		)
	} catch {
		return []
	}
}

function writePersistedToasts(toasts: PersistedToast[]) {
	if (!browser) return

	try {
		if (toasts.length === 0) {
			sessionStorage.removeItem(storageKey)
			return
		}

		sessionStorage.setItem(storageKey, JSON.stringify(toasts))
	} catch {
		// Storage can be unavailable in restricted browser contexts.
	}
}

function removePersistedToast(id: string) {
	writePersistedToasts(readPersistedToasts().filter((toast) => toast.id !== id))
}

function statusHandler(
	id: string,
	onStatusChange?: (details: StatusChangeDetails) => void
) {
	return (details: StatusChangeDetails) => {
		onStatusChange?.(details)
		if (details.status === "unmounted") removePersistedToast(id)
	}
}

function showToast(
	type: keyof typeof defaultDurations,
	options: Options<string>
) {
	const id =
		options.id ??
		`toast:${Date.now().toString(36)}:${Math.random().toString(36).slice(2)}`
	const duration = options.duration ?? defaultDurations[type]
	const persistedToast: PersistedToast = {
		id,
		type,
		title: options.title,
		description: options.description,
		duration,
		expiresAt: Date.now() + restoreWindow
	}

	writePersistedToasts(
		[
			persistedToast,
			...readPersistedToasts().filter((toast) => toast.id !== id)
		].slice(0, 5)
	)

	return toaster.create({
		...options,
		id,
		type: type as Type,
		duration,
		onStatusChange: statusHandler(id, options.onStatusChange)
	})
}

export const toastSuccess = (options: Options<string>) =>
	showToast("success", options)

export const toastError = (options: Options<string>) =>
	showToast("error", options)

export const toastWarning = (options: Options<string>) =>
	showToast("warning", options)

export const toastInfo = (options: Options<string>) =>
	showToast("info", options)

export function restoreToasts() {
	for (const toast of readPersistedToasts()) {
		toaster.create({
			id: toast.id,
			type: toast.type,
			title: toast.title,
			description: toast.description,
			duration: toast.duration,
			onStatusChange: statusHandler(toast.id)
		})
	}
}
