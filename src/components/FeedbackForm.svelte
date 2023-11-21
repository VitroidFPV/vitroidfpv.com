<script lang="ts">
	let useful: boolean = true
	import { fly, fade } from "svelte/transition";
	import { Switch } from "@rgossiaux/svelte-headlessui";
	export let name: string
	import Button from "./Button.svelte";
	import toast from 'svelte-french-toast';

	function submit(event) {
		event.preventDefault();
		const form = event.target;
		const data = new FormData(form);

		fetch(form.action, {
			method: "POST",
			body: new URLSearchParams(data).toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded" 
			}
		}).then(() => {
			toast.success("Feedback Sent!", {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
				iconTheme: {
					primary: "#87cc52",
					secondary: "#000000",
				}
			});
		}).catch((error) => {
			toast.error("Failed to Send!", {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
				iconTheme: {
					primary: "#d6395b",
					secondary: "#000000",
				}
			});
		});
	}
</script>

<form 
	class="p-8 pt-4 bg-neutral-500/10 rounded-3xl backdrop-blur-md border-2 border-neutral-500/40 flex duration-300 
		transition-all flex-col md:w-2/3 md order-last shadow-lg" 
	method="post" 
	{name}
	data-netlify 
	data-netlify-honeypot="bot-field"
	on:submit={submit}
>
	<input type="hidden" name="form-name" value="faq" />
	<h1 class="text-highlight dark:text-highlight-dark">Feedback</h1>
	<p>
		I do my best to keep this site up to date and useful! If you found it useful (or not), have any suggestions, ideas and so on, let me know here to help me improve it!
	</p>
	<p>
		If you suggest a feature or a bit of content that I add to the site, I'll credit you if you want to leave your pilot name below! 
	</p>
	<p>
		For larger/more intensive suggestions, please use the <a href="https://github.com/VitroidFPV/VitroidFPV/issues/new?template=content-suggestion.md&title=Content+Suggestion">GitHub Suggestion template</a>. 
		It allows me to keep track of longer suggestions and progress on them, and update you with progress!
	</p>
	<div class="flex flex-col">
		<div class="flex">
				<Switch 
					bind:checked={useful}
					class={"relative inline-flex items-center rounded-full h-6 w-12 outline outline-2 outline-neutral-400/20 mr-2 duration-300 " + (useful ? "text-highlight/20 dark:bg-highlight-dark/20 outline-highlight dark:outline-highlight-dark" : "bg-neutral-400/10")}
				>
					<span 
						class={"toggle inline-block w-4 rounded-full aspect-square bg-neutral-400/50 duration-300 " + (useful ? "bg-highlight dark:bg-highlight-dark translate-x-7" : "translate-x-1")}
					/>
				</Switch>
			<label for="useful" class="ml-2">Did you find this page helpful?</label>
		</div>
		<div class="mt-4">
			<textarea rows="3" 
				class="bg-neutral-500/10 w-full h-32 rounded-2xl p-3 text-base duration-300
					outline-none focus-within:outline-highlight dark:focus-within:outline-highlight-dark outline-[3px]" name="Feedback"></textarea>

				<input type="text" name="pilotName" class="bg-neutral-500/10 w-42 h-8 rounded-2xl p-3 text-base duration-300
					outline-none focus-within:outline-highlight dark:focus-within:outline-highlight-dark outline-[3px]" />
				<label for="pilotName" class="ml-2">Pilot Name (optional)</label>
		</div>
	</div>
	<div class="mt-4"><Button type="submit" size="sm" isLink={false} color="highlight">Send Feedback!</Button></div>
</form>