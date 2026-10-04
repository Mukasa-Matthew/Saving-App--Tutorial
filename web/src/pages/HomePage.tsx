import { Link } from 'react-router-dom'
import Brand from '../components/Brand'
import { demoUser } from '../data/demoUser'
import { formatCurrency } from '../utils/currency'
import ProgressBar from '../components/ui/ProgressBar'

function HomePage() {
  return (
    <main className="landing-page">
      <header className="site-header">
        <Brand />
        <nav className="public-nav" aria-label="Public navigation">
          <a href="#features">Why GoalSave</a>
          <Link to="/login">Sign in</Link>
          <Link className="nav-cta" to="/register">Get started</Link>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Personal savings, made clearer</p>
          <h1>Turn your plans into progress.</h1>
          <p className="hero-text">Turn the things you care about into achievable savings goals and make steady progress, one contribution at a time.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/register">Start saving <span aria-hidden="true">→</span></Link>
            <Link className="secondary-action" to="/login">Explore demo</Link>
          </div>
          <div className="hero-assurances" aria-label="GoalSave benefits">
            <span><strong>✓</strong> Goal-led planning</span>
            <span><strong>✓</strong> International currencies</span>
            <span><strong>✓</strong> Clear progress tracking</span>
          </div>
        </div>
        <div className="goal-preview" aria-label="Example savings goal">
          <div className="preview-heading">
            <div><p className="preview-label">Your next goal</p><h2>Dream holiday</h2></div>
            <span className="goal-icon" aria-hidden="true">✦</span>
          </div>
          <div className="amount-row"><p><strong>{formatCurrency(3240, demoUser.preferredCurrency)}</strong> saved</p><p>{formatCurrency(5000, demoUser.preferredCurrency)} goal</p></div>
          <ProgressBar value={65} label="65% saved" size="large" />
          <div className="progress-note"><span>65% complete</span><span>Keep going!</span></div>
        </div>
      </section>

      <section className="home-features" id="features" aria-labelledby="features-title">
        <div className="home-section-heading">
          <p className="eyebrow">Built around your priorities</p>
          <h2 id="features-title">Everything you need to save with confidence</h2>
          <p>A simple view of your goals, money movement, and momentum—without unnecessary complexity.</p>
        </div>
        <div className="feature-grid">
          <article><span aria-hidden="true">◎</span><h3>Focused goals</h3><p>Create clear targets, follow progress, and always know what remains.</p></article>
          <article><span aria-hidden="true">↗</span><h3>Useful insights</h3><p>See recent activity and savings summaries in one calm, organized workspace.</p></article>
          <article><span aria-hidden="true">⇄</span><h3>International ready</h3><p>Choose your country and preferred currency independently as your plans evolve.</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <Brand />
        <p>Small steps. Meaningful progress.</p>
        <div><Link to="/login">Sign in</Link><Link to="/register">Create account</Link></div>
      </footer>
    </main>
  )
}

export default HomePage
