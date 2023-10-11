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
	plugins: [sveltekit(), 
		{
			name: 'configure-response-headers',
			configureServer: server => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
					res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
					res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
				next();
				});
			}
		},
		customHmr(),
	],
	server: {
		fs: {
			allow: ["./modules/", "./admin/"]
		},
		port: 3000,
		headers: {
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Resource-Policy": "cross-origin",
		}
	},
	resolve: {
		alias: {
			$components: "/src/components/",
			$lib: "/src/lib/",
			$routes: "/src/routes/",
		},
	},
	rollupInputOptions: {
		external: ['@resvg/resvg-js-win32-x64-msvc'],
	},
	ssr: {
		noExternal: ['three']
	}
};

export default config;