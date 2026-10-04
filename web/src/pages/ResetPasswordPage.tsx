import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand'

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const password = String(data.get('newPassword') ?? '')
    const confirmation = String(data.get('confirmPassword') ?? '')

    if (password.length < 8) {
      setError('Your new password must contain at least 8 characters.')
      return
    }
    if (password !== confirmation) {
      setError('The passwords do not match. Please try again.')
      return
    }

    form.reset()
    setError('')
    setSubmitted(true)
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <Brand />
        <section className="auth-card recovery-card">
          {submitted ? (
            <div className="recovery-result" role="status">
              <span aria-hidden="true">✓</span>
              <p className="eyebrow">Frontend preview</p>
              <h1>Password looks ready</h1>
              <p>No account was changed. A real password reset will be connected securely when the backend is implemented.</p>
              <Link className="submit-button recovery-link" to="/login">Continue to Login</Link>
            </div>
          ) : (
            <>
              <div className="auth-heading">
                <p className="eyebrow">Choose a new password</p>
                <h1>Reset your password</h1>
                <p>Use at least 8 characters and confirm your new password.</p>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <label className="field">
                  <span>New password</span>
                  <span className="password-input"><input type={showPassword ? 'text' : 'password'} name="newPassword" minLength={8} autoComplete="new-password" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button></span>
                </label>
                <label className="field">
                  <span>Confirm new password</span>
                  <span className="password-input"><input type={showPassword ? 'text' : 'password'} name="confirmPassword" minLength={8} autoComplete="new-password" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button></span>
                </label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="submit-button" type="submit">Reset Password</button>
              </form>
              <p className="auth-switch"><Link to="/login">← Back to Login</Link></p>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default ResetPasswordPage
