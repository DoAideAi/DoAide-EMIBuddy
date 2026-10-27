import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/SEO'
import { blogPostMeta } from '../routeMeta'
import BLOG_POSTS from '../data/blogPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <SEO {...blogPostMeta(post)} />

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
