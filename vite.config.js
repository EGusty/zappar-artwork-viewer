import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        open: true,
        https: true  // Zappar necesita HTTPS
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser'
    },
    optimizeDeps: {
        include: ['three', '@zappar/zappar-js', '@zappar/zappar-threejs', 'firebase']
    }
});
