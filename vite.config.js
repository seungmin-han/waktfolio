import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VueDevTools()],
    define: {
        global: {},
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/api': {
                target: 'http://waktfolio.kro.kr:28081',
                changeOrigin: true,
            },
            '^/waktfolio': {
                target: 'http://3.37.62.124:8000',
                changeOrigin: true,
            },
        },
    },
});
