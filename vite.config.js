import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    server: {
        fs: {
            allow: ["./modules/"]
        },
        port: 3000
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