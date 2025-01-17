import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html",
      open: true,
    })
  ],
  optimizeDeps: {
    include: ['@supabase/supabase-js'], // Pre-bundla nödvändiga beroenden
  },
  build: {
    target: 'esnext', // För moderna webbläsare
    minify: 'esbuild', // Snabb och effektiv minifiering
    sourcemap: false, // Inaktivera sourcemaps för produktion
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separera React och andra tredjepartsbibliotek
        },
      },
    },
  },
});
