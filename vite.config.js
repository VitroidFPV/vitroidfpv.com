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
        },
    },
};

export default config;