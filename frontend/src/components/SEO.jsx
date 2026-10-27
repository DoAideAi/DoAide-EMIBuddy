import { Helmet } from 'react-helmet-async'
import { SITE } from '../routeMeta'

// Takes a ROUTE_META / bankMeta / blogPostMeta entry. The prerendered head tags
// carry data-rh="true", so Helmet replaces them on mount instead of adding a
// second canonical or a stale JSON-LD block.
export default function SEO({ title, description, path = '/', keywords = '', type = 'website', jsonLd = [] }) {
  const url = `${SITE}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${SITE}/og-image.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}/og-image.png`} />
      {jsonLd.map((ld) => (
        <script key={ld['@type']} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  )
}
