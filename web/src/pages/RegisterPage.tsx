import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand'
import { countries } from '../data/countries'
import { currencies } from '../data/currencies'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [countryName, setCountryName] = useState('')
  const [callingCode, setCallingCode] = useState('+1')
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function selectCountry(value: string) {
    setCountryName(value)
    const country = countries.find((item) => item.name === value)
    if (country) setCallingCode(country.callingCode)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const country = countries.find((item) => item.name === countryName)
    const phone = String(data.get('phone') ?? '').replace(/[\s()-]/g, '')
    const password = String(data.get('password') ?? '')
    const confirmation = String(data.get('confirmPassword') ?? '')

    if (!form.checkValidity()) return form.reportValidity()
    if (!country) return setFormError('Choose a country from the available suggestions.')
    if (!/^\d{6,14}$/.test(phone)) return setFormError('Enter a valid local phone number using digits only.')
    if (password.length < 8) return setFormError('Your password must contain at least 8 characters.')
    if (password !== confirmation) return setFormError('The passwords do not match.')

    setFormError('')
    setSubmitted(true)
    form.reset()
  }

  return (
    <main className="auth-page">
      <div className="auth-shell auth-shell-wide">
        <Brand />
        <section className="auth-card">
          <div className="auth-heading"><p className="eyebrow">Start your journey</p><h1>Create your account</h1><p>Set up GoalSave and take the first step toward your goals.</p></div>
          {submitted ? (
            <div className="goal-success" role="status"><span aria-hidden="true">✓</span><h3>Registration details look good</h3><p>This is a frontend preview. No account or preferences were saved.</p><Link className="submit-button registration-done" to="/login">Continue to sign in</Link></div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field-grid">
                <label className="field"><span>Full name</span><input type="text" name="name" autoComplete="name" minLength={2} required /></label>
                <label className="field"><span>Email address</span><input type="email" name="email" autoComplete="email" required /></label>
              </div>
              <div className="field-grid">
                <label className="field"><span>Country</span><input list="country-options" name="country" value={countryName} onChange={(event) => selectCountry(event.target.value)} placeholder="Search for a country" autoComplete="country-name" required /><datalist id="country-options">{countries.map((country) => <option value={country.name} key={country.code}>{country.code} · {country.callingCode}</option>)}</datalist></label>
                <label className="field"><span>Preferred currency</span><select name="currency" defaultValue="" required><option value="" disabled>Select a currency</option>{currencies.map((currency) => <option value={currency.code} key={currency.code}>{currency.code} — {currency.name}</option>)}</select></label>
              </div>
              <label className="field"><span>Phone number</span><span className="international-phone"><select name="callingCode" value={callingCode} onChange={(event) => setCallingCode(event.target.value)} aria-label="International calling code">{countries.map((country) => <option value={country.callingCode} key={country.code}>{country.callingCode} · {country.code}</option>)}</select><input type="tel" name="phone" inputMode="tel" autoComplete="tel-national" placeholder="Local phone number" required /></span></label>
              <div className="field-grid">
                <label className="field"><span>Password</span><span className="password-input"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" minLength={8} required /><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button></span></label>
                <label className="field"><span>Confirm password</span><input type={showPassword ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" minLength={8} required /></label>
              </div>
              <div className="registration-consent">
                <label className="checkbox terms"><input type="checkbox" name="terms" required /> I agree to the Terms of Service and Privacy Policy.</label>
                <label className="checkbox terms"><input type="checkbox" name="marketingUpdates" /> Email me GoalSave updates, savings tips, product announcements, and offers. <strong>Optional</strong></label>
              </div>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="submit-button" type="submit">Create Account</button>
            </form>
          )}
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </div>
    </main>
  )
}

export default RegisterPage
