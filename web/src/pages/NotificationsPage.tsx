import { useMemo, useState, type FormEvent } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { savingsGoalsDemo } from '../data/dashboardDemoData'
import { notificationsDemo, remindersDemo, type NotificationCategory } from '../data/notificationsDemoData'
import { BellRing, Landmark, LockKeyhole, Megaphone, Target } from 'lucide-react'

type InboxFilter = 'All' | NotificationCategory
type ReminderFrequency = 'Daily' | 'Weekly' | 'Monthly'

const filters: InboxFilter[] = ['All', 'Savings', 'Transactions', 'Security', 'System']
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const categoryIcons = { Savings: Target, Transactions: Landmark, Security: LockKeyhole, System: Megaphone }

function NotificationsPage() {
  const [notifications, setNotifications] = useState(() => notificationsDemo.map((item) => ({ ...item })))
  const [activeFilter, setActiveFilter] = useState<InboxFilter>('All')
  const [reminders, setReminders] = useState(() => remindersDemo.map((item) => ({ ...item })))
  const [frequency, setFrequency] = useState<ReminderFrequency>('Weekly')
  const [reminderError, setReminderError] = useState('')
  const [reminderSuccess, setReminderSuccess] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length
  const visibleNotifications = useMemo(
    () => activeFilter === 'All' ? notifications : notifications.filter((notification) => notification.category === activeFilter),
    [activeFilter, notifications],
  )

  function toggleRead(id: number) {
    setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: !item.read } : item))
  }

  function dismissNotification(id: number) {
    setNotifications((items) => items.filter((item) => item.id !== id))
  }

  function submitReminder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const goal = String(data.get('goal') ?? '')
    const time = String(data.get('time') ?? '')
    const channels = data.getAll('channels')

    if (!goal || !time) return setReminderError('Choose a savings goal and reminder time.')
    if (!channels.length) return setReminderError('Choose at least one notification channel.')

    form.reset()
    setFrequency('Weekly')
    setReminderError('')
    setReminderSuccess(true)
    window.setTimeout(() => setReminderSuccess(false), 3500)
  }

  return (
    <DashboardLayout>
      <section className="notifications-heading">
        <div><p className="dashboard-kicker">Stay informed</p><h1>Notifications &amp; Reminders</h1><p>Review account activity and plan helpful savings reminders.</p></div>
        <div className="unread-summary"><strong>{unreadCount}</strong><span>Unread</span></div>
      </section>

      <section className="notification-section">
        <div className="notification-toolbar">
          <div className="notification-filters" role="group" aria-label="Filter notifications">
            {filters.map((filter) => <button className={activeFilter === filter ? 'is-active' : ''} type="button" key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <button className="mark-all-button" type="button" onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))} disabled={!unreadCount}>Mark all as read</button>
        </div>

        <div className="notification-list">
          {visibleNotifications.length ? visibleNotifications.map((notification) => {
            const CategoryIcon = categoryIcons[notification.category]
            return (
            <article className={`notification-item ${notification.read ? '' : 'is-unread'}`} key={notification.id}>
              <span className={`notification-category-icon ${notification.category.toLowerCase()}`} aria-hidden="true"><CategoryIcon size={18} /></span>
              <div className="notification-copy">
                <div><span className="notification-category">{notification.category}</span><time>{notification.timestamp}</time></div>
                <h2>{notification.title}{!notification.read && <span className="unread-dot" aria-label="Unread" />}</h2>
                <p>{notification.message}</p>
              </div>
              <div className="notification-actions"><button type="button" onClick={() => toggleRead(notification.id)}>Mark {notification.read ? 'unread' : 'read'}</button><button type="button" onClick={() => dismissNotification(notification.id)}>Dismiss</button></div>
            </article>
            )
          }) : <div className="notification-empty"><BellRing size={24} aria-hidden="true" /><h2>You’re all caught up</h2><p>No notifications match this filter.</p></div>}
        </div>
      </section>

      <section className="reminders-section">
        <div className="section-heading"><div><p className="dashboard-kicker">Build consistency</p><h2>Savings reminders</h2></div></div>
        <div className="reminders-layout">
          <div className="reminder-list">
            {reminders.map((reminder) => (
              <article className="reminder-card" key={reminder.id}>
                <div><span className="goal-card-icon">{reminder.goalName[0]}</span><div><h3>{reminder.goalName}</h3><p>{reminder.frequency} · {reminder.schedule}</p><small>{reminder.channels.join(' and ')}</small></div></div>
                <label className="compact-toggle"><span className="sr-only">Enable {reminder.goalName} reminder</span><input type="checkbox" checked={reminder.enabled} onChange={() => setReminders((items) => items.map((item) => item.id === reminder.id ? { ...item, enabled: !item.enabled } : item))} /></label>
              </article>
            ))}
          </div>

          <div className="reminder-form-card">
            <div className="settings-heading"><h2>Create reminder</h2><p>Preview a schedule without saving or sending it.</p></div>
            <form className="settings-form" onSubmit={submitReminder} noValidate>
              <label className="field"><span>Savings goal</span><select name="goal" defaultValue=""><option value="" disabled>Select a goal</option>{savingsGoalsDemo.map((goal) => <option value={goal.id} key={goal.id}>{goal.name}</option>)}</select></label>
              <div className="field-grid">
                <label className="field"><span>Frequency</span><select name="frequency" value={frequency} onChange={(event) => setFrequency(event.target.value as ReminderFrequency)}><option>Daily</option><option>Weekly</option><option>Monthly</option></select></label>
                <label className="field"><span>Reminder time</span><input name="time" type="time" required /></label>
              </div>
              {frequency === 'Weekly' && <label className="field"><span>Preferred day</span><select name="preferredDay" defaultValue="Friday">{weekdays.map((day) => <option key={day}>{day}</option>)}</select></label>}
              {frequency === 'Monthly' && <label className="field"><span>Preferred day of month</span><select name="preferredDay" defaultValue="1">{Array.from({ length: 28 }, (_, index) => <option value={index + 1} key={index + 1}>{index + 1}</option>)}</select></label>}
              <fieldset className="channel-options"><legend>Notification channels</legend><label className="checkbox"><input type="checkbox" name="channels" value="Email" /> Email</label><label className="checkbox"><input type="checkbox" name="channels" value="Push" /> Push notification <small>(placeholder)</small></label></fieldset>
              <label className="toggle-row standalone-toggle"><span><strong>Enable reminder</strong><small>The preview starts enabled.</small></span><input type="checkbox" name="enabled" defaultChecked /></label>
              {reminderError && <p className="form-error" role="alert">{reminderError}</p>}
              {reminderSuccess && <p className="settings-success" role="status">✓ Reminder validated. Nothing was scheduled or sent.</p>}
              <button className="submit-button" type="submit">Create Reminder</button>
            </form>
          </div>
        </div>
      </section>

      <p className="communication-note"><strong>Communication choices remain separate.</strong> Marketing and product emails are optional in Profile preferences; necessary security and transaction alerts are managed independently.</p>
    </DashboardLayout>
  )
}

export default NotificationsPage
