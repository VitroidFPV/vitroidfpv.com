<script lang="ts">
	export let title: string = "";
	export let href: string = "";
	export let active: boolean = false;
	export let hidden: boolean = false;
</script>

<li 
	class:nav-active={active}
	class:nav-hidden-sm={hidden}
	class="flex md:flex-col md:w-full md:-mt-6 mt-0 md:-mx-0 -mx-4"
>
	<svg 
		width="32" 
		height="32" 
		viewBox="0 0 32 32" 
		fill="transparent"
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 flex-shrink-0 md:self-end md:rotate-0 rotate-[270deg] md:-mb-px corner"
	>
		<path d="M32 0C32 16 16 32 0 32L32 32V0Z"/>
	</svg>
	<div class="nav-content md:py-4 py-2 px-2 md:pr-4 md:mb-0 md:rounded-l-full rounded-tl-none rounded-b-full md:rounded-br-none w-full">
		<a
			{href}
			class="flex md:hover:translate-x-1 nav-link duration-300 md:text-lg text-[0px] w-full md:justify-start justify-center"
		>
			<slot />
			<p class="md:block hidden">{title}</p>
		</a>
	</div>
	<svg 
		width="32" 
		height="32" 
		viewBox="0 0 32 32" 
		fill="transparent"
		xmlns="http://www.w3.org/2000/svg" 
		class="h-6 w-6 flex-shrink-0 md:self-end md:rotate-[270deg] rotate-180 md:-mt-px corner"
	>
		<path d="M32 0C32 16 16 32 0 32L32 32V0Z"/>
	</svg>
</li>