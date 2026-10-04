import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand'
import { useDemoAuth } from '../context/DemoAuthContext'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useDemoAuth()
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    login()
    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <Brand />
        <section className="auth-card">
          <div className="auth-heading">
            <p className="eyebrow">Welcome back</p>
            <h1>Sign in to GoalSave</h1>
            <p>Continue making progress toward what matters to you.</p>
          </div>
          <p className="demo-mode-note"><strong>Demo mode</strong> Enter any valid email address and any password to explore GoalSave.</p>
          <form onSubmit={handleSubmit}>
            <label className="field"><span>Email address</span><input type="email" name="email" autoComplete="email" required /></label>
            <label className="field">
              <span>Password</span>
              <span className="password-input">
                <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button>
              </span>
            </label>
            <div className="form-options forgot-only">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className="submit-button" type="submit">Sign In</button>
          </form>
          <p className="auth-switch">New to GoalSave? <Link to="/register">Create an account</Link></p>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
