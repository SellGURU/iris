import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
    ,VitePWA({
      registerType: 'autoUpdate',
      // devOptions: {
      //   enabled: true
      // },
      includeAssets: ['favicon.ico', "icon-512x512.png","icon-384x384.png","icon-256x256.png","icon-192x192.png","icon-152x152.png",'icon-48x48.png', 'icon-72x72.png', "icon-96x96.png","icon-128x128.png","icon-144x144.png"],
      manifest: {
        name: 'Iris',
        short_name: 'Iris',
        description: 'Iris',
        theme_color: '#ffffff',
        display: "standalone",
        icons: [
          {
            "src": "/iconspwa/icons/icon-48x48.png",
            "sizes": "48x48",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/iconspwa/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000
      }
    })

  ],
})
