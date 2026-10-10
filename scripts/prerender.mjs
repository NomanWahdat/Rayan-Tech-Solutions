import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { Writable } from 'node:stream'
import {
  metadata,
  structuredData,
  siteRoutes,
  projects,
  render,
} from '../.prerender/entry-server.js'

const dist = resolve('dist')
const template = await readFile(join(dist, 'index.html'), 'utf8')
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
function head(pathname) {
  const meta = metadata(pathname)
  return (
    '<title>' +
    escape(meta.title) +
    '</title>\n' +
    '<meta name="description" content="' +
    escape(meta.description) +
    '">\n' +
    '<meta name="robots" content="' +
    (meta.noindex ? 'noindex,follow' : 'index,follow') +
    '">\n' +
    '<link rel="canonical" href="' +
    meta.url +
    '">\n' +
    ['title', 'description', 'url', 'image']
      .map(
        (key) =>
          '<meta property="og:' + key + '" content="' + escape(meta[key]) + '">'
      )
      .join('\n') +
    '\n' +
    '<meta property="og:type" content="website">\n<meta name="twitter:card" content="summary_large_image">\n' +
    ['title', 'description', 'image']
      .map(
        (key) =>
          '<meta name="twitter:' +
          key +
          '" content="' +
          escape(meta[key]) +
          '">'
      )
      .join('\n') +
    '\n' +
    '<script id="site-schema" type="application/ld+json">' +
    JSON.stringify(structuredData(pathname)).replaceAll('<', '\\u003c') +
    '</script>'
  )
}
for (const pathname of [...siteRoutes, '/404']) {
  const chunks = []
  let finish
  const finished = new Promise((resolve) => {
    finish = resolve
  })
  const destination = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk.toString())
      callback()
    },
    final(callback) {
      finish()
      callback()
    },
  })
  await render(pathname, destination)
  await finished
  const folder = pathname === '/' ? dist : join(dist, pathname.slice(1))
  await mkdir(folder, { recursive: true })
  const html = template
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, head(pathname))
    .replace(
      '<div id="root"></div>',
      '<div id="root" data-route="' +
        pathname +
        '">' +
        chunks.join('') +
        '</div>'
    )
  await writeFile(join(folder, 'index.html'), html)
  if (pathname === '/404') await writeFile(join(dist, '404.html'), html)
}
const urls = siteRoutes
  .map((pathname) => '<url><loc>' + metadata(pathname).url + '</loc></url>')
  .join('\n')
await writeFile(
  join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    '\n</urlset>'
)
// Exact image slots are also generated from the same project configuration.
const imageManifest = projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  images: project.images,
}))
await writeFile(
  join(dist, 'portfolio-image-slots.json'),
  JSON.stringify(imageManifest, null, 2)
)
await writeFile(
  'public/portfolio-image-slots.json',
  JSON.stringify(imageManifest, null, 2)
)
for (const project of projects) {
  const folder = join('public', 'images', 'portfolio', project.slug)
  await mkdir(folder, { recursive: true })
  await writeFile(
    join(folder, 'README.md'),
    '# ' +
      project.title +
      '\n\nAdd real project screenshots using these exact filenames:\n\n' +
      project.images
        .map(
          (image) => '- ' + image.src.split('/').at(-1) + ' — ' + image.caption
        )
        .join('\n') +
      '\n\nMissing screenshots use a clearly labeled fallback. No image file needs to be created until a real screenshot is available.\n'
  )
}
// Catch data integrity and route regressions at build time.
const slugs = new Set()
for (const project of projects) {
  if (slugs.has(project.slug))
    throw new Error('Duplicate project slug: ' + project.slug)
  slugs.add(project.slug)
  if (project.cardCover) await access(join(dist, project.cardCover))
  if (
    project.relatedProjects.length < 2 ||
    project.relatedProjects.some(
      (slug) =>
        slug === project.slug || !projects.some((item) => item.slug === slug)
    )
  )
    throw new Error('Invalid related projects: ' + project.slug)
  await access(join(dist, 'portfolio', project.slug, 'index.html'))
}
console.log(
  'Pre-rendered ' +
    siteRoutes.length +
    ' routes, generated sitemap, and documented ' +
    projects.length +
    ' project image folders.'
)
