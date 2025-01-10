import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  optimizeDeps: {
    exclude: ['svelte-transition'],
  },

})
