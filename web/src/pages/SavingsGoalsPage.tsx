import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { savingsGoalsDemo } from '../data/dashboardDemoData'
import { demoUser } from '../data/demoUser'
import { formatCurrency } from '../utils/currency'
import CreateGoalModal from '../components/CreateGoalModal'
import ProgressBar from '../components/ui/ProgressBar'
import { ArrowRight, CalendarDays, Plus, Target } from 'lucide-react'

function SavingsGoalsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const totalTarget = savingsGoalsDemo.reduce((sum, goal) => sum + goal.target, 0)
  const totalSaved = savingsGoalsDemo.reduce((sum, goal) => sum + goal.saved, 0)

  return (
    <DashboardLayout>
      <section className="goals-page-heading">
        <div><p className="dashboard-kicker">Plan your progress</p><h1>Savings Goals</h1><p>Create clear targets and keep every priority moving forward.</p></div>
        <button className="create-goal-button" type="button" onClick={() => setModalOpen(true)}><Plus size={18} /> Create Goal</button>
      </section>

      <section className="goals-summary" aria-label="Goals summary">
        <div><span>Active goals</span><strong>{savingsGoalsDemo.length}</strong></div>
        <div><span>Total target</span><strong>{formatCurrency(totalTarget, demoUser.preferredCurrency)}</strong></div>
        <div><span>Total saved</span><strong>{formatCurrency(totalSaved, demoUser.preferredCurrency)}</strong></div>
      </section>

      <section className="goals-page-grid" aria-label="Savings goals">
        {savingsGoalsDemo.map((goal) => (
          <article className="full-goal-card" key={goal.id}>
            <div className="full-goal-top">
              <span className="goal-card-icon"><Target size={19} /></span>
              <span className={`status-badge ${goal.status === 'On track' ? 'on-track' : ''}`}>{goal.status}</span>
            </div>
            <h2>{goal.name}</h2>
            <p className="goal-description">{goal.description}</p>
            <div className="goal-numbers"><span><small>Saved</small><strong>{formatCurrency(goal.saved, demoUser.preferredCurrency)}</strong></span><span><small>Target</small><strong>{formatCurrency(goal.target, demoUser.preferredCurrency)}</strong></span></div>
            <div className="goal-progress-label"><span>{goal.progress}% complete</span><span>{formatCurrency(goal.target - goal.saved, demoUser.preferredCurrency)} remaining</span></div>
            <ProgressBar value={goal.progress} label={`${goal.progress}% saved`} />
            <div className="goal-date"><CalendarDays size={16} aria-hidden="true" /> Target date: <strong>{goal.targetDate}</strong></div>
            <Link className="goal-details-link" to={`/dashboard/goals/${goal.id}`}>View goal details <ArrowRight size={16} aria-hidden="true" /></Link>
          </article>
        ))}
      </section>

      {modalOpen && <CreateGoalModal onClose={() => setModalOpen(false)} />}
    </DashboardLayout>
  )
}

export default SavingsGoalsPage
