import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BLOG_POSTS from '../data/blogPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'EMIBuddy', url: 'https://emibuddy.doaide.com' },
    publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://emibuddy.doaide.com/blog/${post.slug}` },
    url: `https://emibuddy.doaide.com/blog/${post.slug}`,
    keywords: post.keywords,
    articleSection: post.category,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | EMIBuddy</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://emibuddy.doaide.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://emibuddy.doaide.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <Link to="/blog" className="text-brand-primary hover:underline text-sm">&larr; All Articles</Link>
        </nav>

        <header className="mb-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary/20 text-brand-primary mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-brand-muted">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div
          className="prose prose-invert prose-blue max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-brand-muted prose-p:leading-relaxed prose-p:mb-4
            prose-li:text-brand-muted
            prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:mb-4 prose-ol:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <section className="mt-16 border-t border-brand-border pt-10">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {post.faqs.map((faq, i) => (
              <details key={i} className="group p-5 rounded-xl border border-brand-border bg-brand-card" open={i === 0}>
                <summary className="flex items-center justify-between cursor-pointer text-white font-semibold list-none">
                  {faq.question}
                  <span className="ml-4 text-brand-muted group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-brand-muted leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 p-6 rounded-xl bg-brand-primary/10 border border-brand-primary/30 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Ready to crunch the numbers?</h3>
          <p className="text-brand-muted mb-4">Try our free calculators — no login required.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/emi-calculator" className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded-lg transition-colors text-sm">EMI Calculator</Link>
            <Link to="/sip-calculator" className="px-5 py-2.5 bg-brand-card hover:bg-brand-border text-white font-semibold rounded-lg border border-brand-border transition-colors text-sm">SIP Calculator</Link>
            <Link to="/ppf-calculator" className="px-5 py-2.5 bg-brand-card hover:bg-brand-border text-white font-semibold rounded-lg border border-brand-border transition-colors text-sm">PPF Calculator</Link>
          </div>
        </section>
      </article>
    </>
  )
}
