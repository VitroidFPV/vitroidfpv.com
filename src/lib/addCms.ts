export async function addCms() {
	// if (typeof window !== 'undefined') return;

	const { default: CMS } = await import('netlify-cms-app');

	CMS.init();
}