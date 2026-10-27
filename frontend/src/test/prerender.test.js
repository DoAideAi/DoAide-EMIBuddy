import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { SITE, allRoutes } from '../routeMeta'
import { BANKS } from '../data/banks'
import BLOG_POSTS from '../data/blogPosts'
import { withRoute, serveConfig } from '../../scripts/prerender-routes.mjs'

const root = join(__dirname, '..', '..')
const shell = readFileSync(join(root, 'index.html'), 'utf-8')
const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf-8')
const routes = allRoutes(BANKS, BLOG_POSTS)

describe('routes and sitemap', () => {
  it('lists exactly the prerendered routes', () => {
    const inSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort()
    expect(routes.map((r) => `${SITE}${r.path}`).sort()).toEqual(inSitemap)
  })

  it('gives every route a unique title and description', () => {
    expect(new Set(routes.map((r) => r.title)).size).toBe(routes.length)
    expect(new Set(routes.map((r) => r.description)).size).toBe(routes.length)
  })
})

describe('withRoute', () => {
  it.each(routes.map((r) => [r.path, r]))('%s has its own head tags and h1', (path, route) => {
    const html = withRoute(shell, route)
    const url = `${SITE}${path}`
    const canonicals = [...html.matchAll(/rel="canonical" href="([^"]+)"/g)].map((m) => m[1])
    expect(canonicals).toEqual([url])
    expect(html.match(/<title[^>]*>/g)).toHaveLength(1)
    expect(html).toContain(`property="og:url" content="${url}"`)
    expect(html).toContain('property="og:image"')
    expect(html).toMatch(/<div id="root"><main><h1>[^<]+<\/h1>/)

    const ld = [...html.matchAll(/<script data-rh="true" type="application\/ld\+json">(.*?)<\/script>/g)]
    expect(ld.length).toBe(route.jsonLd.length)
    for (const [, json] of ld) expect(JSON.parse(json)['@context']).toBe('https://schema.org')
  })

  it('escapes HTML in titles', () => {
    const html = withRoute(shell, { ...routes[1], title: 'A & <B>', h1: '<x>' })
    expect(html).toContain('<title data-rh="true">A &amp; &lt;B&gt;</title>')
    expect(html).toContain('<h1>&lt;x&gt;</h1>')
  })
})

describe('serveConfig', () => {
  it('rewrites every non-root route to its own file, then falls back to the SPA shell', () => {
    const { rewrites } = serveConfig(routes)
    expect(rewrites).toHaveLength(routes.length)
    expect(rewrites).toContainEqual({ source: '/banks/sbi', destination: '/banks/sbi/index.html' })
    expect(rewrites.at(-1)).toEqual({ source: '**', destination: '/index.html' })
  })
})
