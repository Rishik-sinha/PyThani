import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy any request starting with /api
      '/api': {
        target: 'https://api.freepik.com', // The real API server
        changeOrigin: true, // This is required for it to work
        secure: false, // You can set this to false for http/https mix
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api from the path
      },
    },
  },
});