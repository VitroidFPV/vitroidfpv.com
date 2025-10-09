<script lang="ts">
	import { Icon } from "@steeze-ui/svelte-icon";
	import { XMark } from "@steeze-ui/heroicons";
	import { hiddenAnnouncements } from "../lib/stores/announcementsStore";

	import announcementsData from "../../modules/announcements.yml";

	const typeColors = {
		info: "bg-blue-400 text-white",
		warning: "bg-amber-400 text-black",
		success: "bg-green-400 text-black",
		error: "bg-red-400 text-black"
	} as const;

	type AnnouncementType = keyof typeof typeColors;

	function getAnnouncementColor(announcement: { type: AnnouncementType }) {
		return typeColors[announcement.type] || typeColors.info;
	}

	function closeAnnouncement(index: number) {
		hiddenAnnouncements.update((current) => {
			if (!current.includes(index)) {
				return [...current, index];
			}
			return current;
		});
	}

	function isAnnouncementVisible(announcement: { id: number; active: boolean }) {
		return announcement.active && !$hiddenAnnouncements.includes(announcement.id);
	}
</script>

{#each announcementsData.announcements as announcement}
	{#if isAnnouncementVisible(announcement)}
		<div class="w-full {getAnnouncementColor(announcement)} px-4 py-1 flex justify-between items-center">
			<div class="text-center font-semibold text-base w-full">{announcement.text}</div>
			<button onclick={() => closeAnnouncement(announcement.id)} class="p-1 rounded-md hover:bg-black/10">
				<Icon src={XMark} class="h-5 w-5 stroke-3" size="20" theme="default" title="Close" />
			</button>
		</div>
	{/if}
{/each}