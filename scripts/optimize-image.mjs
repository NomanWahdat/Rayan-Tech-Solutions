// Export an existing image for the web; keep visual content and transparency.
import { chromium } from 'playwright'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
const [source, destination, widthText = '640'] = process.argv.slice(2)
if (!source || !destination)
  throw new Error(
    'Usage: node scripts/optimize-image.mjs source destination.webp width'
  )
const bytes = await readFile(source)
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  const data = await page.evaluate(
    async ({ encoded, width }) => {
      const img = new Image()
      img.src = 'data:image/png;base64,' + encoded
      await img.decode()
      const canvas = document.createElement('canvas')
      canvas.width = Math.min(width, img.naturalWidth)
      canvas.height = Math.round(
        (img.naturalHeight * canvas.width) / img.naturalWidth
      )
      const context = canvas.getContext('2d')
      context.imageSmoothingQuality = 'high'
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/webp', 0.9).split(',')[1]
    },
    { encoded: bytes.toString('base64'), width: Number(widthText) }
  )
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, Buffer.from(data, 'base64'))
  console.log('Optimized asset saved: ' + destination)
} finally {
  await browser.close()
}
