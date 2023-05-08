<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { spin } from '$lib/transition';
	export let src: string;

	let play = false;

	let audio: HTMLAudioElement | null = null;
	let duration = 0;
	let currentTime = 0;

	let progressPercent = 0;

	// console.log(src)

	$: {
		// get progress percent from current time and duration
		// avoid NaN and Infinity
		if (duration && duration !== Infinity && currentTime && play) {
			progressPercent = (currentTime / duration) * 100;
		}
		// console.log(progressPercent)
	}

	onMount(() => {
		audio = document.getElementById('audioPlayer') as HTMLAudioElement;
		// console.log(audio)

		audio?.addEventListener('ended', () => {
			play = false;
			setTimeout(() => {
				progressPercent = 0;
				audio.currentTime = 0;
			}, 350);
		})

		audio?.addEventListener('timeupdate', () => {
			currentTime = audio?.currentTime || 0;
			duration = audio?.duration || 0;

			// console.log(currentTime, duration)
		})
	})

	// console.log(audio)

	function togglePlay() {
		// console.log(audio)
		if (audio) {
			if (play) {
				audio.pause();
				play = false;
			} else {
				audio.play();
				play = true;
			}
		}
	}
</script>

{#if src}
	<div class="">
		<button on:click={togglePlay} class="mb-2 text-neutral-500/80 hover:text-blue/80 duration-300">
			{#if !play}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			{/if}
		</button>

		<div class="w-full bg-neutral-500/20">
			<div class="h-1 bg-blue duration-500" style="width: {progressPercent}%;"></div>
		</div>

		<audio {src} class="hidden" id="audioPlayer" controls></audio>
	</div>
{/if}