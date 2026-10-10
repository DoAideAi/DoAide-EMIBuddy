import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import BLOG_POSTS from '../data/blogPosts'

export default function BlogList() {
  return (
    <>
      <SEO
        title="Financial Planning Blog"
        description="Expert guides on home loan EMI, SIP vs lumpsum investing, PPF vs FD comparison, and more. Free financial planning tips for India."
        keywords="financial blog India, EMI guide, SIP investment tips, PPF guide, FD comparison, personal finance India"
        path="/blog"
      />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">Financial Planning Blog</h1>
        <p className="text-brand-muted text-center mb-12 max-w-2xl mx-auto">
          Expert guides to help you make smarter decisions about loans, investments, and savings in India.
        </p>

        <div className="space-y-6">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block p-6 rounded-xl border border-brand-border bg-brand-card hover:border-brand-primary/50 transition-all group"
            >
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-primary/20 text-brand-primary mb-3">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-brand-muted text-sm mb-3 line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-brand-muted">
                <time dateTime={post.datePublished}>
                  {new Date(post.datePublished).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
