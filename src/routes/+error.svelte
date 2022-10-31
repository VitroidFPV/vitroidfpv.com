<script>
	import { page } from '$app/stores';
	import Header from '$components/Header.svelte';
	import MainHeader from '$components/mainHeader.svelte';
	import Paragraph from '$components/Paragraph.svelte';
	import Link from '$components/Link.svelte';
	import { slide } from 'svelte/transition';

	let descr =
		"There has been an error loading this page";
	let img = "";
	let title = "VitroidFPV - Error";
	let url = "";

	let open
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={descr} />
	<meta property="og:image" content={img} />
	<meta property="og:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={descr} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="content-box">
	<MainHeader>Oops!</MainHeader>
	<Header text="There has been an error loading this page" />
	<Paragraph>
		Either it doesn't exist, or I messed something up. If it doesn't exist, you can go <Link>back</Link> to the main site, if you think it's the latter, please contact me
		<div class="tracking-normal not-intersecting text-main-200 dark:text-contrast-100 border-none flex flex-col mt-2">
			<div class="flex align-start">
			<button
				type="button"
				on:click={() => (open = !open)}
				class:text-highlight={open}
				class:dark:text-highlight-dark={open}
				class="collapsible duration-300
						after:ml-1 text-[20px] md:text-xl duartion-150 hover:text-highlight dark:hover:text-highlight-dark text-left">
				Full info:
			</button>
		</div>
			{#if open}
				<div transition:slide class="content text-xl h-full min-w-fit max-w-[70vw] border-l-4 border-highlight dark:border-highlight-dark">
					<div class="p-4 text-base md:text-lg leading-relaxed md">{$page.status}: {$page.error.message}</div>
				</div>
			{/if}
		</div>
	</Paragraph>
</div>
