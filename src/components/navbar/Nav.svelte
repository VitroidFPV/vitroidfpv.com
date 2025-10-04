<script>
	import ThemeToggle from "./themeToggle.svelte";
	import { page } from "$app/state";
	import NavItem from "$components/navbar/NavItem.svelte";
	import { Icon } from "@steeze-ui/svelte-icon";
	import { Home, QuestionMarkCircle, WrenchScrewdriver, Newspaper, Heart, Calculator } from "@steeze-ui/heroicons";
	// export let segment
</script>

<nav
	class="md:w-fit bottom-0 md:h-screen w-screen test-nav md:justify-start flex md:flex-col flex-row md:items-center border-highlight dark:border-highlight-dark md:border-r-8 md:border-t-0 border-t-8 fixed z-60 bg-contrast-100 dark:bg-main-400 md:shadow-2xl md:shadow-black/50 shadow-[0px_-25px_50px_-12px] shadow-black/30 dark:shadow-black/60">
	<ul
		class="md:mt-8 md:pl-2 flex md:flex-col flex-row md:justify-start test-li justify-center px-4 md:h-full h-fit md:px-0 w-full -translate-y-px text-main-100 dark:text-contrast-100 pb-1">
		<NavItem href="/" title="Home" active={page.url.pathname === "/"}>
			<Icon src={Home} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem>
		<NavItem href="/faq" title="FAQ" active={page.url.pathname.startsWith("/faq")}>
			<Icon src={QuestionMarkCircle} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem>
		<NavItem href="/builds" title="Builds" active={page.url.pathname.startsWith("/builds")}>
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
		<NavItem href="/equipment" title="Equipment" active={page.url.pathname.startsWith("/equipment")}>
			<Icon src={WrenchScrewdriver} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem>
		<NavItem href="/articles" title="Articles" active={page.url.pathname.startsWith("/articles")}>
			<Icon src={Newspaper} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem>
		<!-- <NavItem href="/tools" title="Tools" active={page.url.pathname.startsWith("/tools")} hidden>
			<Icon src={Calculator} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem> -->
		<NavItem href="/support" title="Support" active={page.url.pathname.startsWith("/support")} hidden>
			<Icon src={Heart} class="w-7 h-7 md:mr-2" stroke-width="1.5" />
		</NavItem>
	</ul>
	<ThemeToggle />
</nav>
<div class="md:h-screen md:min-w-[157px] md:max-w-[158px] w-full h-[64px]"></div>
