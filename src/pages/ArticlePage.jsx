// Individual article page — renders a single Learn article by URL slug
// URL pattern: /learn/:slug
import { useParams, Link, Navigate } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getArticle, getRelatedArticles } from '../data/articles'
import './ArticlePage.css'

export default function ArticlePage() {
  const { slug } = useParams()
  const { open } = useModal()
  const article = getArticle(slug)

  // If the slug doesn't match any article, redirect to the Learn hub
  if (!article) {
    return <Navigate to="/learn" replace />
  }

  const related = getRelatedArticles(article.related)

  return (
    <>
      {/* Article hero */}
      <section className="article-hero page-hero">
        <div className="container article-hero__inner">
          <p className="article-hero__meta">
            <span className="article-hero__category">{article.category}</span>
            <span className="article-hero__sep" aria-hidden="true">·</span>
            <span className="article-hero__date">{article.date}</span>
          </p>
          <h1 className="article-hero__headline">{article.title}</h1>
          <Link to="/learn" className="article-hero__back">← Back to Learn</Link>
        </div>
      </section>

      {/* Article body */}
      <section className="article-body bg-green-dark section-padding">
        <div className="container article-body__inner">
          <ArticleContent content={article.content} />
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="article-related bg-green section-padding">
          <div className="container">
            <p className="article-related__label">Keep reading</p>
            <div className="article-related__grid">
              {related.map((a) => (
                <RelatedCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="article-cta bg-sand section-padding">
        <div className="container article-cta__inner reveal" ref={useScrollReveal()}>
          <h2 className="article-cta__headline">Have questions about your own loan?</h2>
          <button className="article-cta__btn" onClick={open}>Enquire Now →</button>
        </div>
      </section>
    </>
  )
}

// Renders the article content blocks
// Types: 'p' (paragraph), 'h2' (subheading), 'pullquote'
function ArticleContent({ content }) {
  const ref = useScrollReveal()
  return (
    <div className="article-content reveal" ref={ref}>
      {content.map((block, i) => {
        if (block.type === 'h2') {
          return <h2 key={i} className="article-content__h2">{block.text}</h2>
        }
        if (block.type === 'pullquote') {
          return (
            <blockquote key={i} className="article-content__pullquote">
              {block.text}
            </blockquote>
          )
        }
        return <p key={i} className="article-content__p">{block.text}</p>
      })}
    </div>
  )
}

function RelatedCard({ article }) {
  const ref = useScrollReveal()
  return (
    <Link to={`/learn/${article.slug}`} className="related-card reveal" ref={ref}>
      <span className="related-card__category">{article.category}</span>
      <h3 className="related-card__title">{article.title}</h3>
      <span className="related-card__read">Read →</span>
    </Link>
  )
}
