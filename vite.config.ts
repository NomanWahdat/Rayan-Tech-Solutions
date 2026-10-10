import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleInquiry } from './scripts/inquiry-http.mjs'

function projectAssets() {
  let root = ''
  let ssr = false
  function collect() {
    const files: string[] = []
    const directory = join(root, 'public', 'images', 'portfolio')
    function walk(folder: string, prefix: string) {
      if (!existsSync(folder)) return
      for (const entry of readdirSync(folder, { withFileTypes: true })) {
        if (entry.isDirectory())
          walk(join(folder, entry.name), prefix + '/' + entry.name)
        else if (/\.(webp|png|jpe?g)$/i.test(entry.name))
          files.push(prefix + '/' + entry.name)
      }
    }
    walk(directory, '/images/portfolio')
    return JSON.stringify(files)
  }
  return {
    name: 'portfolio-asset-manifest',
    configResolved(config: {
      root: string
      build: { ssr?: boolean | string }
    }) {
      root = config.root
      ssr = Boolean(config.build.ssr)
    },
    configureServer(server: {
      middlewares: {
        use: (
          middleware: (
            request: { url?: string },
            response: {
              setHeader: (name: string, value: string) => void
              end: (body: string) => void
            },
            next: () => void
          ) => void
        ) => void
      }
    }) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split('?')[0] !== '/portfolio-assets.json')
          return next()
        response.setHeader('Content-Type', 'application/json')
        response.setHeader('Cache-Control', 'no-store')
        response.end(collect())
      })
    },
    generateBundle(this: {
      emitFile: (asset: {
        type: 'asset'
        fileName: string
        source: string
      }) => void
    }) {
      if (!ssr)
        this.emitFile({
          type: 'asset',
          fileName: 'portfolio-assets.json',
          source: collect(),
        })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const privateEnv = loadEnv(mode, process.cwd(), '')
  for (const name of [
    'RESEND_API_KEY',
    'CONTACT_FROM_EMAIL',
    'CONTACT_TO_EMAIL',
  ]) {
    if (privateEnv[name]) process.env[name] = privateEnv[name]
  }
  return {
    plugins: [
      react(),
      projectAssets(),
      {
        name: 'local-project-inquiry',
        configureServer(server) {
          server.middlewares.use((request, response, next) => {
            if (request.url?.split('?')[0] !== '/api/inquiry') return next()
            void handleInquiry(request, response).catch(() => {
              response.writeHead(500, { 'Content-Type': 'application/json' })
              response.end(
                JSON.stringify({
                  success: false,
                  error: 'Please retry or contact us on WhatsApp.',
                })
              )
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      strictPort: false,
      open: false,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
  }
})
