import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //base: './', // Use relative paths for assets (important for Ngrok and non-root deployments)
  //build: {
    //outDir: 'dist', // Ensure output directory is correct
    //rollupOptions: {
    //  input: './index.html', // Ensure Vite uses the correct HTML file as entry
    //},
  //},
});
