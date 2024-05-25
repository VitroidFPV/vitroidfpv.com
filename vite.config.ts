import { sveltekit } from '@sveltejs/kit/vite';
import { PluginOption } from "vite";

export function customHmr() {
	return {
	name: 'custom-hmr',
	enforce: 'post',
	// HMR
	handleHotUpdate({ file, server }) {
		if (file.endsWith('.css')) {
		console.log('reloading css file...');

		server.ws.send({
			type: 'full-reload',          
			path: '*'
		});
		}
	},
	}
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), customHmr(),],
	server: {
		fs: {
			allow: ["./modules/", "./admin/", '../..']
		},
		port: 3000,
	},
	resolve: {
		alias: {
			$components: "/src/components/",
			$lib: "/src/lib/",
			$routes: "/src/routes/",
		},
	},
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
	},
	rollupInputOptions: {
		external: ['@resvg/resvg-js-win32-x64-msvc'],
	},
	ssr: {
		noExternal: ['three']
	}
};

export default config;