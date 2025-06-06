import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Projects/Accomplishments/',  // Add this line
  build: {
    outDir: 'dist', // Or whatever your output directory is
    emptyOutDir: true // Or whatever your assets directory is
  },
})
