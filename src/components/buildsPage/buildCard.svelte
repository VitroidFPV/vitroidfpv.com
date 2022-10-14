<script>
	import Link from "../Link.svelte";

	export let short = "false";
	export let color;
	export let title;
	export let link;
	export let img = "";
	export let text1 = "";
	export let text2 = "";
	export let text3 = "";
	export let text4 = "";
	export let text5 = "";
</script>

<div
	class="bg-contrast-300 dark:bg-main-300 my-8 mx-4 w-72 h-36 hover:h-96 rounded-[1.5rem] card {color} {short} shadow-[0px_-22px_0px,0px_25px_50px_-15px_#181818] duration-500 relative flex flex-col items-center group hover:delay-[0ms] delay-500">
	<div
		class="bulge {color} w-40 h-20 rounded-b-[2rem] absolute
            before:content-[''] before:absolute before:bg-transparent before:rounded-full before:w-12 before:h-12 before:-left-12 before:shadow-[22px_-22px_0px]
            after:content-[''] after:absolute after:bg-transparent after:rounded-full after:w-12 after:h-12 after:-right-12 after:shadow-[-22px_-22px_0px]">
        <div class="relative">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src="{img}" class="absolute h-28 w-28 left-6 -top-6 group-hover:-translate-y-2 duration-300">
        </div>
    </div>
    <div class="top-20 relative self-start pl-3">
		<Link {color} color1="inherit" {link} size="3">{title}</Link>
        <div class="text-[19px] mt-4">
            <ul class="list-disc list-inside h-0 invisible group-hover:visible">
                <li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[100ms]">{text1}</li>
                <li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[175ms]">{text2}</li>
                <li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[250ms]">{text3}</li>
                <li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[325ms]">{text4}</li>
                <li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[400ms]">{text5}</li>
            </ul>
        </div>
    </div>
</div>
