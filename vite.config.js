import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // --- ADD THIS LINE ---
  base: "/PyThani/", // This must match your repository name

  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.freepik.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});