/** Dispatch event on click outside of node */
export function clickoutside(node: HTMLElement): {
	destroy(): void;
} {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent('clickoutside', { detail: node })
			);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		},
	};
}
