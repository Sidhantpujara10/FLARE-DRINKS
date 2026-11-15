import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:single` makes one self contained HTML file (handy for sharing a preview)
export default defineConfig(({ mode }) => ({
  // Relative paths so the site works on GitHub Pages (/FLARE-DRINKS/) and on Vercel alike
  base: './',
  plugins: [react(), tailwindcss(), mode === 'single' && viteSingleFile()].filter(Boolean),
  build: mode === 'single' ? { outDir: 'dist-single' } : {},
}))
