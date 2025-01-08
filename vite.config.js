import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure the root is the project directory
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: './index.html', // Use index.html as the entry point
    },
  },
});
