// Post-build step: writes dist/<route>/index.html for every route from
// src/routeMeta.js, with that route's title, description, canonical, social
// tags and JSON-LD in the static head, plus its h1 in #root. Without it every
// route served the homepage shell, canonical included, so Google folded them
// all into the homepage. Also writes dist/serve.json routing each URL to its
// own file. Once React mounts, Helmet takes over the data-rh="true" head tags
// and createRoot replaces the contents of #root.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, allRoutes } from '../src/routeMeta.js'
import { BANKS } from '../src/data/banks.js'
import BLOG_POSTS from '../src/data/blogPosts.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Same tags, in the same order, as components/SEO.jsx.
function headTags({ title, description, path, keywords, type = 'website', jsonLd }) {
  const url = `${SITE}${path}`
  const image = `${SITE}/og-image.png`
  const meta = (attr, key, value) => `<meta data-rh="true" ${attr}="${key}" content="${esc(value)}" />`
  return [
    `<title data-rh="true">${esc(title)}</title>`,
    meta('name', 'description', description),
    keywords && meta('name', 'keywords', keywords),
    `<link data-rh="true" rel="canonical" href="${url}" />`,
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:type', type),
    meta('property', 'og:image', image),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
    ...jsonLd.map(
      (ld) => `<script data-rh="true" type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
    .filter(Boolean)
    .map((t) => `    ${t}\n`)
    .join('')
}

export function withRoute(shell, route) {
  // Drop the shell's homepage tags, then insert this route's in their place.
  const stripped = shell.replace(/ {4}<(title|meta|link|script)[^>]* data-rh="true"[^>]*>(?:[^<]*<\/\1>)?\n/g, '')
  if (/data-rh="true"/.test(stripped)) throw new Error('index.html has a data-rh tag the prerender could not strip')
  return stripped
    .replace('  </head>', `${headTags(route)}  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><main><h1>${esc(route.h1)}</h1><p>${esc(route.description)}</p></main></div>`,
    )
}

export function serveConfig(routes) {
  return {
    rewrites: routes
      .filter((r) => r.path !== '/')
      .map((r) => ({ source: r.path, destination: `${r.path}/index.html` })),
    headers: [{ source: '/assets/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }],
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const shell = readFileSync(join(dist, 'index.html'), 'utf-8')
  const routes = allRoutes(BANKS, BLOG_POSTS)
  for (const route of routes) {
    const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, withRoute(shell, route))
  }
  writeFileSync(join(dist, 'serve.json'), JSON.stringify(serveConfig(routes), null, 2) + '\n')
  console.log(`prerendered ${routes.length} routes`)
}
