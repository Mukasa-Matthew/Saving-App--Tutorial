import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Calculator, CircleUserRound, Goal, LayoutDashboard, LogOut, Menu, ReceiptText, X } from 'lucide-react'
import Brand from '../components/Brand'
import { demoUser } from '../data/demoUser'
import { useDemoAuth } from '../context/DemoAuthContext'

type DashboardLayoutProps = { children: ReactNode }

const navigationGroups = [
  { label: 'Main', items: [
    { label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Savings Goals', icon: Goal, to: '/dashboard/goals' },
    { label: 'Transactions', icon: ReceiptText, to: '/dashboard/transactions' },
  ] },
  { label: 'Tools', items: [
    { label: 'Currency Converter', icon: Calculator, to: '/dashboard/converter' },
    { label: 'Notifications', icon: Bell, to: '/dashboard/notifications' },
  ] },
  { label: 'Account', items: [
    { label: 'Profile', icon: CircleUserRound, to: '/dashboard/profile' },
  ] },
]

const pageDetails = [
  { match: /^\/dashboard$/, title: 'Overview', subtitle: 'A clear view of your savings progress.' },
  { match: /^\/dashboard\/goals\/[^/]+$/, title: 'Goal details', subtitle: 'Review progress and recent activity.' },
  { match: /^\/dashboard\/goals$/, title: 'Savings goals', subtitle: 'Track the plans that matter to you.' },
  { match: /^\/dashboard\/transactions$/, title: 'Transactions', subtitle: 'Review movement across your goals.' },
  { match: /^\/dashboard\/converter$/, title: 'Currency converter', subtitle: 'Plan confidently across currencies.' },
  { match: /^\/dashboard\/notifications$/, title: 'Notifications', subtitle: 'Account updates and savings reminders.' },
  { match: /^\/dashboard\/profile$/, title: 'Profile & settings', subtitle: 'Manage your GoalSave preferences.' },
]

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavigation, setMobileNavigation] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useDemoAuth()
  const currentPage = pageDetails.find((page) => page.match.test(location.pathname)) ?? pageDetails[0]

  function signOut() {
    logout()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    function updateNavigationMode(event: MediaQueryListEvent) {
      setMobileNavigation(event.matches)
      if (!event.matches) setMenuOpen(false)
    }
    mediaQuery.addEventListener('change', updateNavigationMode)
    return () => mediaQuery.removeEventListener('change', updateNavigationMode)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function closeOnEscape(event: KeyboardEvent) { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className="dashboard-layout">
      <aside id="dashboard-navigation" className={`dashboard-sidebar ${menuOpen ? 'is-open' : ''}`} aria-hidden={mobileNavigation && !menuOpen} inert={mobileNavigation && !menuOpen ? true : undefined}>
        <div className="sidebar-top"><Brand /><button className="menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button></div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {navigationGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-group-label">{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon
                return <NavLink className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`} to={item.to} end={item.to === '/dashboard'} key={item.label} onClick={() => setMenuOpen(false)}><Icon className="nav-icon" size={19} strokeWidth={1.8} aria-hidden="true" />{item.label}</NavLink>
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-account">
          <Link className="sidebar-user" to="/dashboard/profile" onClick={() => setMenuOpen(false)}><span className="profile-avatar" aria-hidden="true">{demoUser.initials}</span><span><strong>{demoUser.fullName}</strong><small>{demoUser.email}</small></span></Link>
          <button className="sidebar-signout" type="button" onClick={signOut}><LogOut size={18} /> Sign out</button>
        </div>
      </aside>

      {menuOpen && <button className="nav-backdrop" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <div className="dashboard-workspace">
        <header className="dashboard-header">
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="dashboard-navigation"><Menu size={22} /></button>
          <div className="mobile-brand"><Brand /></div>
          <div className="header-page-title"><strong>{currentPage.title}</strong><span>{currentPage.subtitle}</span></div>
          <Link className="header-icon-button" to="/dashboard/notifications" aria-label="Open notifications"><Bell size={20} /><span className="notification-indicator" /></Link>
          <Link className="profile-summary" to="/dashboard/profile" aria-label="Open profile"><div className="profile-copy"><strong>{demoUser.fullName}</strong><span>{demoUser.preferredCurrency} account</span></div><span className="profile-avatar" aria-hidden="true">{demoUser.initials}</span></Link>
        </header>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
