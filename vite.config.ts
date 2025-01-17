import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html", // Visar statistik över byggandet
      open: true, // Öppnar statistikfiler automatiskt när bygget är klart
    }),
  ],
  optimizeDeps: {
    include: ['@supabase/supabase-js'], // Pre-bundla nödvändiga beroenden
  },
  build: {
    target: 'esnext', // För moderna webbläsare
    minify: 'esbuild', // Snabb och effektiv minifiering
    sourcemap: false, // Inaktivera sourcemaps för produktion
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dela upp externa bibliotek i en egen chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // Alla externa bibliotek samlas här
          }
          // Lägg till fler specifika chunks för stora filer om du vill
          if (id.includes('react-router-dom')) {
            return 'react-router'; // T.ex. react-router
          }
        },
      },
    },
  },
});
