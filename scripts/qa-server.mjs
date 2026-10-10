// Static production preview used by the browser checks; no development transforms.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep, join } from 'node:path'
import { handleInquiry } from './inquiry-http.mjs'
const root = resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
}
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname
    )
    if (pathname === '/api/inquiry') {
      await handleInquiry(request, response)
      return
    }
    let file = resolve(root, '.' + pathname)
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403)
      response.end()
      return
    }
    let status = 200
    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
      await stat(file)
    } catch {
      file = join(root, '404.html')
      status = 404
    }
    response.writeHead(status, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
    })
    response.end(request.method === 'HEAD' ? undefined : await readFile(file))
  } catch {
    response.writeHead(500)
    response.end('Preview unavailable')
  }
}).listen(4173, '127.0.0.1', () =>
  console.log('Production QA preview: http://127.0.0.1:4173')
)
