<div class="bg-contrast-300 w-72 h-32 hover:h-96 rounded-[1.5rem] card {color} shadow-[0px_-22px_0px] duration-500 relative flex flex-col items-center group hover:delay-[0ms] delay-500">
    <div class="bulge {color} w-40 h-16 rounded-b-[2rem] absolute
    before:content-[''] before:absolute before:bg-transparent before:rounded-full before:w-12 before:h-12 before:-left-12 before:shadow-[22px_-22px_0px]
    after:content-[''] after:absolute after:bg-transparent after:rounded-full after:w-12 after:h-12 after:-right-12 after:shadow-[-22px_-22px_0px]"></div>
    <div class="top-16 relative self-start">
        <a href="{link}" class="text-3xl font-medium ml-3 bg-gradient-to-r title {color} bg-no-repeat bg-left-bottom bg-0w group-hover:bg-100w duration-300 w-fit">{title}</a>
        <div class="ml-3 text-xl">
            <ul class="list-disc list-inside invisible group-hover:visible">
                <li class="text-transparent group-hover:text-main-200 group-hover:dark:text-contrast-100 duration-300 delay-[100ms]">{text1}</li>
                <li class="text-transparent group-hover:text-main-200 group-hover:dark:text-contrast-100 duration-300 delay-[175ms]">{text2}</li>
                <li class="text-transparent group-hover:text-main-200 group-hover:dark:text-contrast-100 duration-300 delay-[250ms]">{text3}</li>
                <li class="text-transparent group-hover:text-main-200 group-hover:dark:text-contrast-100 duration-300 delay-[325ms]">{text4}</li>
                <li class="text-transparent group-hover:text-main-200 group-hover:dark:text-contrast-100 duration-300 delay-[400ms]">{text5}</li>
            </ul>
        </div>
    </div>
</div>

<script>
    export let color
    export let title
    export let link
    export let text1
    export let text2
    export let text3
    export let text4
    export let text5
</script>