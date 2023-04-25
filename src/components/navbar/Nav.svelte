<script>
	import ThemeToggle from "./themeToggle.svelte";
	import { page } from "$app/stores";
	import NavItem from "$components/navbar/NavItem.svelte";
	// export let segment
</script>

<nav
	class="md:w-fit bottom-0 md:h-screen w-screen test-nav md:justify-start flex md:flex-col flex-row md:items-center border-highlight dark:border-highlight-dark md:border-r-8 md:border-t-0 border-t-[13px] fixed z-[60] bg-contrast-100 dark:bg-main-400 md:shadow-2xl md:shadow-black/50 shadow-[0px_-25px_50px_-12px] shadow-black/30 dark:shadow-black/60">
	<ul
		class="md:mt-8 md:pl-2 flex md:flex-col flex-row md:justify-start test-li justify-center px-4 h-fit md:px-0 w-full -translate-y-[1px] text-main-100 dark:text-contrast-100">
		<!-- <li class="nav" class:nav-active={$page.url.pathname === "/"}>
			<a
				href="/"
				class="flex hover:translate-x-1 hover:text-highlight dark:hover:text-highlight-dark duration-300 md:text-lg text-[0px] w-full md:justify-start justify-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7 md:mr-2">
  					<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
				</svg>
				Home
			</a>
		</li>
		<li class="nav" class:nav-active={$page.url.pathname === "/faq"}>
			<a
				href="/faq"
				class="flex hover:translate-x-1 hover:text-highlight dark:hover:text-highlight-dark duration-300 md:text-lg text-[0px] w-full md:justify-start justify-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
				</svg>
				FAQ
			</a>
		</li>
		<li class="nav" class:nav-active={$page.url.pathname.startsWith("/builds")}>
			<a
				href="/builds"
				class="bg-[url('https://i.imgur.com/rbaaSaJ.png')] md:bg-none 
            md:dark:bg-none bg-no-repeat bg-center md:text-lg text-[0px] h-full 
            w-full md:h-fit md:w-fit md:bg-[length:32px_32px] md:hover:text-highlight dark:hover:text-highlight-dark 
            duration-200 md:hover:translate-x-1 bg-[length:24px_24px] md:dark:brightness-100 dark:brightness-[4.5] md:dark:saturate-100 dark:saturate-[0.25]"
				>Builds
			</a>
		</li>
		<li class="nav" class:nav-active={$page.url.pathname.startsWith("/equipment")}>
			<a
				href="/equipment"
				class="flex hover:translate-x-1 hover:text-highlight dark:hover:text-highlight-dark duration-300 md:text-lg text-[0px] w-full md:justify-start justify-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
				</svg>

				Equipment
			</a>
		</li>
		<li class="nav" class:nav-active={$page.url.pathname.startsWith("/articles")}>
			<a
				href="/articles"
				class="bg-[url('https://img.icons8.com/material-outlined/64/292929/news.png')]
				md:bg-none md:dark:bg-none bg-no-repeat bg-center md:text-lg text-[0px] h-full 
				w-full md:h-fit md:w-fit md:bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark 
				duration-200 md:hover:translate-x-1 bg-[length:24px_24px] md:dark:brightness-100 dark:brightness-[5]"
				>Articles
			</a>
		</li> -->
		<!-- <li class="flex flex-col w-full">
			<svg 
				width="32" 
				height="32" 
				viewBox="0 0 32 32" 
				fill="none"
				xmlns="http://www.w3.org/2000/svg" 
				class="h-6 w-6 flex-shrink-0 fill-highlight dark:fill-highlight-dark self-end -mb-px"
			>
				<path d="M32 0C32 16 16 32 0 32L32 32V0Z"/>
			</svg>
			<div class="bg-highlight dark:bg-highlight-dark py-4 pl-2 rounded-l-full w-full">
				<a
					href="/faq"
					class="flex hover:translate-x-1 hover:text-highlight dark:hover:text-highlight-dark duration-300 md:text-lg text-[0px] w-full md:justify-start justify-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
					</svg>
					FAQ
				</a>
			</div>
			<svg 
				width="32" 
				height="32" 
				viewBox="0 0 32 32" 
				fill="none"
				xmlns="http://www.w3.org/2000/svg" 
				class="h-6 w-6 flex-shrink-0 fill-highlight dark:fill-highlight-dark self-end rotate-[270deg] -mt-px"
			>
				<path d="M32 0C32 16 16 32 0 32L32 32V0Z"/>
			</svg>
		</li> -->
		<NavItem href="/" title="Home" active={$page.url.pathname === "/"}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7 md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
			</svg>
		</NavItem>
		<NavItem href="/faq" title="FAQ" active={$page.url.pathname.startsWith("/faq")}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7 md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
			</svg>
		</NavItem>
		<NavItem href="/builds" title="Builds" active={$page.url.pathname.startsWith("/builds")}>
			<svg width="150" height="150" viewBox="0 0 200 200" fill="currentColor" stroke-width="8" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:mr-2">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M92.8079 95.1565C92.9816 94.8991 93.0481 94.5859 92.9687 
				94.2857C83.8268 59.7442 94.1948 4.97097 99.6692 3.70844C105.241 2.42341 106.009 3.43176 106.009 6.9173C106.009 
				7.74605 105.962 8.95909 105.902 10.5199V10.52C105.708 15.5238 105.375 24.1017 106.009 35.0506C106.566 44.6669 
				107.308 48.1922 108.188 52.3745C108.622 54.4396 109.09 56.6648 109.587 59.8625C111.791 74.0627 110.482 80.6871 
				106.704 93.7946C106.611 94.1204 106.69 94.474 106.895 94.7435C107.134 95.0556 107.351 95.3844 107.546 
				95.7277C107.688 95.9771 107.912 96.1661 108.189 96.2413C142.668 105.61 184.89 141.953 183.247 147.324C181.574 
				152.791 180.317 152.952 177.298 151.21C176.58 150.795 175.553 150.148 174.232 149.315L174.232 149.315C169.995 
				146.645 162.733 142.068 152.934 137.143C144.328 132.817 140.904 131.697 136.842 130.368L136.842 130.368C134.836 
				129.711 132.675 129.004 129.657 127.835C116.492 122.734 111.355 118.354 102.204 108.883C101.964 108.634 
				101.61 108.528 101.269 108.578C100.855 108.639 100.431 108.67 100 108.67C99.7327 108.67 99.4682 108.658 
				99.2071 108.634C98.8936 108.606 98.5828 108.702 98.3575 108.922C72.8226 133.847 20.8884 151.978 17.0838 
				147.896C13.185 143.714 13.6743 142.544 16.6928 140.802C17.4105 140.387 18.4846 139.821 19.8665 139.093C24.2969 
				136.76 31.8919 132.759 41.057 126.735C49.1064 121.444 51.7886 119.039 54.9706 116.186L54.9706 116.186C56.5418 
				114.777 58.2348 113.259 60.7559 111.231C71.9294 102.24 78.3176 100.052 91.5041 96.7802C91.8114 96.704 92.0661 
				96.4841 92.205 96.1996C92.3822 95.837 92.5838 95.4886 92.8079 95.1565Z"/>
			</svg>
			<!-- well damn -->
		</NavItem>
		<NavItem href="/equipment" title="Equipment" active={$page.url.pathname.startsWith("/equipment")}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
			</svg>
		</NavItem>
		<NavItem href="/articles" title="Articles" active={$page.url.pathname.startsWith("/articles")}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
			</svg>
		</NavItem>
		<NavItem href="/support" title="Support me" active={$page.url.pathname.startsWith("/support")} hidden>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
			</svg>
		</NavItem>
	</ul>
	<ThemeToggle />
</nav>
<div class="md:h-screen md:min-w-[157px] md:max-w-[158px] w-full h-[64px]" />
