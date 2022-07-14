import { defineConfig } from 'vite'
import path from 'path'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styls-react': path.join(__dirname, '..', 'src', 'indexReact'),
      system: path.join(__dirname, 'src', 'common', 'system')
    }
  }
})
