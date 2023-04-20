import { backInOut } from 'svelte/easing';

export function expand(node:HTMLElement, {
	delay = 0,
	duration = 300,
}) {
	const h = node.offsetHeight;
	const w = node.offsetWidth;


	return {
		delay,
		duration,
		// @ts-ignore
		css: t => {
			const eased = backInOut(t)
			// first 50% of the animation, the height stays at 48px, the width goes from 0 to 100%
			// delay the second 50% of the animation by 50ms
			// second 50% of the animation, the height goes from 48px to 100%, the width stays 100%
			// also from t 0 to 100, ease opacity from 0 to 1
			return `
				overflow: hidden;
				height: ${t < 0.5 ? 48 : eased * h}px;
				width: ${t < 0.5 ? eased * w : w}px;
				opacity: ${t};
			`
		}
	}
}