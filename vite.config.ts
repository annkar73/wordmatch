import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html", 
      open: true, 
    }),
  ],
  optimizeDeps: {
    include: ['@supabase/supabase-js'], 
  },
  build: {
    target: 'esnext', 
    minify: 'esbuild', 
    sourcemap: false, 
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      external: ['**/readme-assets**'],
      output: {
        manualChunks(id) {
          
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
          
          if (id.includes('react-router-dom')) {
            return 'react-router'; 
          }
        },
      },
    },
  },
});
