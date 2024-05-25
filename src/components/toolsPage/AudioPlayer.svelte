<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	import { Icon } from "@steeze-ui/svelte-icon";
	import { PauseCircle, PlayCircle, StopCircle } from "@steeze-ui/heroicons";

	export let src: string;

	let play = false;
	
	let audioPlayer: HTMLAudioElement;

	function handlePlayPause() {
		if (play) {
			audioPlayer.pause();
			play = false;
		} else {
			audioPlayer.play();
			play = true;
		}
	}

	function handleStop() {
		audioPlayer.pause();
		audioPlayer.currentTime = 0;
		play = false;
	}

	let progressPercent = tweened(0, { duration: 300, easing: cubicOut });
	let progressElement: HTMLInputElement;

	function handleProgress() {
		audioPlayer.currentTime = (parseFloat(progressElement.value) / 100) * audioPlayer.duration;
		progressPercent.set(parseFloat(progressElement.value), { duration: 50 });
		if (!play) {
			handlePlayPause();
		}
	}

	function handleTimeUpdate() {
		$progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
	}

	function handleEnded() {
		play = false;
	}

</script>

{#if src}
	<div class="">
		<button on:click={handlePlayPause} class="mb-2 text-neutral-500/80 hover:text-cyan/80 duration-300">
			{#if !play}
				<Icon class="w-8 h-8" src={PlayCircle} />
			{:else}
				<Icon class="w-8 h-8" src={PauseCircle} />
			{/if}
		</button>
		<button on:click={handleStop} class="mb-2 text-neutral-500/80 hover:text-cyan/80 duration-300">
			<Icon class="w-8 h-8" src={StopCircle} />
		</button>

		<div class="w-full bg-neutral-500/20 rounded-full overflow-hidden relative">
			<div class="h-2 bg-cyan rounded-full" style="width: {$progressPercent}%;"></div>
			<div class="absolute -top-2 w-[calc(100%_+_1rem)] h-full -left-2">
				<input
					type="range"
					name="progress"
					id="progress"
					class="w-full opacity-0 cursor-pointer"
					min="0"
					max="100"
					step="0.01"
					bind:this={progressElement}
					on:input={handleProgress}
					on:click={handleProgress}
				>
			</div>
		</div>

		<audio 
			{src} 
			class="hidden" 
			id="audioPlayer" 
			controls 
			bind:this={audioPlayer} 
			on:timeupdate={handleTimeUpdate} 
			on:ended={handleEnded}
		></audio>
	</div>
{/if}