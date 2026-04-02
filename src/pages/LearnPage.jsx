// Learn hub — article grid with category tags, titles, excerpts
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { articles } from '../data/articles'
import './LearnPage.css'

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero learn-hero">
        <div className="container">
          <p className="page-hero__label">Resources</p>
          <h1 className="page-hero__headline">Learn</h1>
          <p className="page-hero__sub">
            Understanding finance shouldn't require a degree.
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="learn-grid-section bg-green-dark section-padding">
        <div className="container">
          <div className="learn-grid">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} delay={i % 3} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ArticleCard({ article, delay }) {
  const ref = useScrollReveal()
  return (
    <Link
      to={`/learn/${article.slug}`}
      className={`article-card reveal reveal-delay-${delay + 1}`}
      ref={ref}
    >
      <span className="article-card__category">{article.category}</span>
      <h2 className="article-card__title">{article.title}</h2>
      <p className="article-card__excerpt">{article.excerpt}</p>
      <span className="article-card__read">Read →</span>
    </Link>
  )
}
