import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const nonBlockingCssPlugin = () => ({
  name: 'non-blocking-css',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      return html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]+?\.css)"([^>]*?)>/gi,
        (match, p1, p2, href, p3) => {
          if (match.includes('media="print"') || match.includes('fonts.googleapis')) {
            return match
          }
          return `<link${p1}rel="stylesheet"${p2}href="${href}"${p3} media="print" onload="this.media='all'"><noscript><link${p1}rel="stylesheet"${p2}href="${href}"${p3}></noscript>`
        }
      )
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nonBlockingCssPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    modulePreload: {
      polyfill: false,
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap') || id.includes('locomotive-scroll') || id.includes('lenis')) {
              return 'vendor-animation'
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('lucide-react')
            ) {
              return 'vendor-core'
            }
          }
        },
      },
    },
  },
})