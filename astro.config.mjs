// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,pdf}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
        suppressWarnings: true,
      }
    })
  ]
});
