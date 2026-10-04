import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { countries } from '../data/countries'
import { currencies } from '../data/currencies'
import { demoUser } from '../data/demoUser'
import { useDemoAuth } from '../context/DemoAuthContext'
import Modal from '../components/ui/Modal'

type Notice = 'personal' | 'security' | 'preferences' | null

function ProfilePage() {
  const [notice, setNotice] = useState<Notice>(null)
  const [securityError, setSecurityError] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { logout } = useDemoAuth()
  const navigate = useNavigate()

  function signOut() {
    logout()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  function submitPersonal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setNotice('personal')
  }

  function submitSecurity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const currentPassword = String(data.get('currentPassword') ?? '')
    const newPassword = String(data.get('newPassword') ?? '')
    const confirmPassword = String(data.get('confirmPassword') ?? '')

    if (!currentPassword || newPassword.length < 8) {
      setSecurityError('Enter your current password and a new password of at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setSecurityError('The new passwords do not match.')
      return
    }
    form.reset()
    setSecurityError('')
    setNotice('security')
  }

  function submitPreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('preferences')
  }

  return (
    <DashboardLayout>
      <section className="profile-page-heading">
        <p className="dashboard-kicker">Account settings</p>
        <h1>Profile</h1>
        <p>Review your details, security settings, and preferences.</p>
      </section>

      <section className="profile-summary-card">
        <span className="profile-page-avatar" aria-hidden="true">{demoUser.initials}</span>
        <div><h2>{demoUser.fullName}</h2><p>{demoUser.email} · {demoUser.callingCode} {demoUser.phoneNumber} · {demoUser.country}</p></div>
        <span className="account-status"><span aria-hidden="true" />{demoUser.status}</span>
      </section>

      <div className="profile-sections">
        <section className="settings-card">
          <div className="settings-heading"><div><h2>Personal information</h2><p>Update the contact details shown on your account.</p></div></div>
          <form className="settings-form" onSubmit={submitPersonal}>
            <label className="field"><span>Full name</span><input name="fullName" type="text" defaultValue={demoUser.fullName} minLength={2} autoComplete="name" required /></label>
            <div className="field-grid">
              <label className="field"><span>Email address</span><input name="email" type="email" defaultValue={demoUser.email} autoComplete="email" required /></label>
              <label className="field"><span>Country</span><select name="country" defaultValue={demoUser.countryCode}>{countries.map((country) => <option value={country.code} key={country.code}>{country.name}</option>)}</select></label>
            </div>
            <label className="field"><span>Phone number</span><span className="international-phone"><select name="callingCode" defaultValue={demoUser.callingCode} aria-label="International calling code">{countries.map((country) => <option value={country.callingCode} key={country.code}>{country.callingCode} · {country.code}</option>)}</select><input name="phone" type="tel" defaultValue={demoUser.phoneNumber} pattern="[0-9 ()-]{6,18}" autoComplete="tel-national" required /></span></label>
            {notice === 'personal' && <p className="settings-success" role="status">✓ Preview saved for this screen only. No profile data was persisted.</p>}
            <div className="settings-actions"><button className="submit-button" type="submit">Save information</button></div>
          </form>
        </section>

        <section className="settings-card">
          <div className="settings-heading"><div><h2>Security</h2><p>Choose a strong password for your account.</p></div></div>
          <form className="settings-form" onSubmit={submitSecurity} noValidate>
            <label className="field"><span>Current password</span><input name="currentPassword" type="password" autoComplete="current-password" required /></label>
            <div className="field-grid">
              <label className="field"><span>New password</span><input name="newPassword" type="password" minLength={8} autoComplete="new-password" required /></label>
              <label className="field"><span>Confirm new password</span><input name="confirmPassword" type="password" minLength={8} autoComplete="new-password" required /></label>
            </div>
            {securityError && <p className="form-error" role="alert">{securityError}</p>}
            {notice === 'security' && <p className="settings-success" role="status">✓ Password validation passed. Nothing was changed or saved.</p>}
            <div className="settings-actions"><button className="submit-button" type="submit">Update password</button></div>
          </form>
        </section>

        <section className="settings-card">
          <div className="settings-heading"><div><h2>Preferences</h2><p>Choose how GoalSave should look and keep you informed.</p></div></div>
          <form className="settings-form" onSubmit={submitPreferences}>
            <label className="field"><span>Preferred currency</span><select name="currency" defaultValue={demoUser.preferredCurrency}>{currencies.map((currency) => <option value={currency.code} key={currency.code}>{currency.code} — {currency.name}</option>)}</select></label>
            <label className="field"><span>Theme preference</span><select name="theme" defaultValue="system"><option value="system">Use device setting</option><option value="light">Light</option><option value="dark">Dark (coming soon)</option></select></label>
            <div className="preference-toggles">
              <label className="toggle-row"><span><strong>Security alerts</strong><small>Receive important email alerts about account security.</small></span><input type="checkbox" name="securityAlerts" defaultChecked={demoUser.notifications.securityAlerts} /></label>
              <label className="toggle-row"><span><strong>Savings reminders</strong><small>Receive reminders about upcoming target dates.</small></span><input type="checkbox" name="savingsReminders" defaultChecked={demoUser.notifications.savingsReminders} /></label>
              <label className="toggle-row"><span><strong>Transaction updates</strong><small>Receive email status updates for deposits and withdrawals.</small></span><input type="checkbox" name="transactionUpdates" defaultChecked={demoUser.notifications.transactionUpdates} /></label>
              <label className="toggle-row"><span><strong>Product updates and offers</strong><small>Optional emails with GoalSave news, tips, announcements, and offers.</small></span><input type="checkbox" name="marketingUpdates" defaultChecked={demoUser.notifications.marketingUpdates} /></label>
            </div>
            {notice === 'preferences' && <p className="settings-success" role="status">✓ Preferences previewed. No settings were persisted.</p>}
            <div className="settings-actions"><button className="submit-button" type="submit">Save preferences</button></div>
          </form>
        </section>

        <section className="settings-card danger-zone">
          <div className="settings-heading"><div><h2>Account</h2><p>These controls are frontend placeholders during development.</p></div></div>
          <div className="account-actions">
            <div><strong>Sign out</strong><p>Return to the sign-in screen without ending a real session.</p></div>
            <button className="sign-out-button" type="button" onClick={signOut}>Sign Out</button>
          </div>
          <div className="account-actions delete-action">
            <div><strong>Delete account</strong><p>Permanently remove your account and savings information.</p></div>
            <button className="delete-button" type="button" onClick={() => setDeleteDialogOpen(true)}>Delete Account</button>
          </div>
        </section>
      </div>

      {deleteDialogOpen && (
        <Modal labelledBy="delete-title" onClose={() => setDeleteDialogOpen(false)} className="delete-dialog">
            <span className="danger-icon" aria-hidden="true">!</span>
            <h2 id="delete-title">Account deletion isn’t available yet</h2>
            <p>This frontend demonstration cannot delete your account or any data. Account deletion will be implemented later with secure backend verification.</p>
            <button className="submit-button" type="button" onClick={() => setDeleteDialogOpen(false)}>Got it</button>
        </Modal>
      )}
    </DashboardLayout>
  )
}

export default ProfilePage
