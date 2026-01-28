// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '1B Bach | Noticias y examenes',
        short_name: '1B Bach',
        description: 'Sitio de noticias y exámenes para 1B Bachillerato',
        theme_color: '#2000ad',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        // Estrategia de caché: solo imágenes
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
              }
            }
          },
          {
            // Todo lo demás: NetworkOnly (sin caché)
            urlPattern: /.*/,
            handler: 'NetworkOnly'
          }
        ],
        // No precachear nada automáticamente
        globPatterns: [],
        navigateFallback: null
      },

      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
        suppressWarnings: true,
      }
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});