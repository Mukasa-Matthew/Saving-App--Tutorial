import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand'

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    form.reset()
    setSubmitted(true)
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <Brand />
        <section className="auth-card recovery-card">
          {submitted ? (
            <div className="recovery-result" role="status">
              <span aria-hidden="true">✉</span>
              <p className="eyebrow">Request received</p>
              <h1>Check your email</h1>
              <p>If an account exists for this email, password reset instructions would be sent.</p>
              <Link className="submit-button recovery-link" to="/login">Back to Login</Link>
            </div>
          ) : (
            <>
              <div className="auth-heading">
                <p className="eyebrow">Account recovery</p>
                <h1>Forgot your password?</h1>
                <p>Enter your email address and we’ll prepare reset instructions.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <label className="field"><span>Email address</span><input type="email" name="email" autoComplete="email" required /></label>
                <button className="submit-button" type="submit">Request reset link</button>
              </form>
              <p className="auth-switch"><Link to="/login">← Back to Login</Link></p>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
