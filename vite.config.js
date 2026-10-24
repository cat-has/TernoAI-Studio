import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'offline.html', 'robots.txt'],
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'], navigateFallback: 'index.html' },
      manifest: {
        name: 'TernoAI Studio',
        short_name: 'TernoAI',
        description: 'Product to AI try-on video queue for kids fashion affiliates',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBE3EA',
        theme_color: '#2B1530',
        icons: [
          ...sizes.map((s) => ({ src: `icon-${s}.png`, sizes: `${s}x${s}`, type: 'image/png' })),
          { src: 'icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        screenshots: [
          { src: 'screenshots/narrow.png', sizes: '540x960', type: 'image/png', form_factor: 'narrow' },
          { src: 'screenshots/wide.png', sizes: '1280x720', type: 'image/png', form_factor: 'wide' }
        ]
      }
    })
  ]
})
