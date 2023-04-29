import { sveltekit } from '@sveltejs/kit/vite';

// const viteServerConfig = {
// 	name: "vite-server",
// 	configureServer(server) {
// 		server.middlewares.use((req, res, next) => {
// 			// res.setHeader("Access-Control-Allow-Origin", "*");
// 			// Cross-Origin-Embedder-Policy: require-corp
// 			// Cross-Origin-Opener-Policy: same-origin

// 			res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
// 			res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

// 			next();
// 		});
// 	},
// };

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
		}
	],
	server: {
		fs: {
			allow: ["./modules/"]
		},
		port: 3000,
		// headers: {
		// 	"Cross-Origin-Embedder-Policy": "require-corp",
		// 	"Cross-Origin-Opener-Policy": "same-origin",
		// 	"Cross-Origin-Resource-Policy": "cross-origin",
		// }
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
};

export default config;