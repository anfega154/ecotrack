import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'def675f346c9.ngrok-free.app'
    ]
  },
  plugins: [react()],
})
