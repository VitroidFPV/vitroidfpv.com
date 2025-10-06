import type { Action } from 'svelte/action';

/** Dispatch event on click outside of node */
export const clickoutside: Action<
	HTMLElement,
	undefined,
	{
		onclickoutside: (e: CustomEvent<HTMLElement>) => void;
	}
> = (node) => {
	$effect(() => {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
				node.dispatchEvent(
					new CustomEvent('clickoutside', { detail: node })
				);
			}
		};

		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	});
};
