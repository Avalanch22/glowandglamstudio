import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about/index.html'),
        portfolio: path.resolve(__dirname, 'portfolio/index.html'),
        packages: path.resolve(__dirname, 'packages/index.html'),
        reviews: path.resolve(__dirname, 'reviews/index.html'),
        bookNow: path.resolve(__dirname, 'book-now/index.html'),
        contact: path.resolve(__dirname, 'contact/index.html'),
        services: path.resolve(__dirname, 'services/index.html'),
        bridalMakeup: path.resolve(__dirname, 'services/bridal-makeup/index.html'),
        receptionMakeup: path.resolve(__dirname, 'services/reception-makeup/index.html'),
        partyMakeup: path.resolve(__dirname, 'services/party-makeup/index.html'),
        engagementMakeup: path.resolve(__dirname, 'services/engagement-makeup/index.html'),
        hairstyling: path.resolve(__dirname, 'services/hairstyling/index.html'),
      }
    }
  }
})
