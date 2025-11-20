import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: "/kine-bellevue-athus/",
  plugins: [react()],
})