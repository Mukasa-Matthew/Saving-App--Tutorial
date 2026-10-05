import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Calculator, Goal, Plus, Target, Trophy, WalletCards } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardLayout from '../layouts/DashboardLayout'
import { dashboardSummaryDemo, recentTransactionsDemo, savingsActivityDemo, savingsGoalsDemo } from '../data/dashboardDemoData'
import { demoUser } from '../data/demoUser'
import { formatCurrency } from '../utils/currency'
import CreateGoalModal from '../components/CreateGoalModal'
import ProgressBar from '../components/ui/ProgressBar'

function transactionAmount(type: string, amount: number) {
  return `${type === 'Deposit' ? '+' : '-'}${formatCurrency(amount, demoUser.preferredCurrency)}`
}

type TooltipPayload = { payload: { month: string; saved: number } }

function SavingsTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const { month, saved } = payload[0].payload
  return (
    <div className="chart-tooltip">
      <span>{month}</span>
      <strong>{formatCurrency(saved, demoUser.preferredCurrency)}</strong>
    </div>
  )
}

const chartTotal = savingsActivityDemo.reduce((sum, point) => sum + point.saved, 0)
const chartSummary = `Monthly savings activity. ${savingsActivityDemo[0].month} to ${savingsActivityDemo[savingsActivityDemo.length - 1].month}, rising from ${formatCurrency(savingsActivityDemo[0].saved, demoUser.preferredCurrency)} to ${formatCurrency(savingsActivityDemo[savingsActivityDemo.length - 1].saved, demoUser.preferredCurrency)}, ${formatCurrency(chartTotal, demoUser.preferredCurrency)} saved in total.`

const currentHour = new Date().getHours()
const dashboardGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

function DashboardPage() {
  const [createGoalOpen, setCreateGoalOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <section className="dashboard-welcome dashboard-page-heading">
        <div><h1>{dashboardGreeting}, Matthew</h1><p>Your goals are moving forward. Here’s the latest.</p></div>
        <button className="create-goal-button" type="button" onClick={() => setCreateGoalOpen(true)}><Plus size={18} /> Create Goal</button>
      </section>

      <section className="finance-summary" aria-label="Savings summary">
        <article className="total-savings-card">
          <div className="summary-card-label"><span>Total savings</span><WalletCards size={22} /></div>
          <strong>{formatCurrency(dashboardSummaryDemo.totalSaved, demoUser.preferredCurrency)}</strong>
          <p><span>+14.2%</span> compared with last month</p>
          <small>Across {dashboardSummaryDemo.activeGoals} active goals</small>
        </article>
        <div className="supporting-metrics">
          <article><Target size={19} /><span>Active goals</span><strong>{dashboardSummaryDemo.activeGoals}</strong><small>Currently in progress</small></article>
          <article><ArrowUpRight size={19} /><span>Saved this month</span><strong>{formatCurrency(dashboardSummaryDemo.monthlySaved, demoUser.preferredCurrency)}</strong><small>Best month this quarter</small></article>
          <article><Trophy size={19} /><span>Goals completed</span><strong>{dashboardSummaryDemo.completedGoals}</strong><small>Since joining GoalSave</small></article>
        </div>
      </section>

      <section className="dashboard-main-grid">
        <article className="savings-chart-panel">
          <div className="section-heading"><div><h2>Savings activity</h2><p>Your monthly contributions</p></div><span className="chart-period">Last 6 months</span></div>
          <div className="savings-chart" aria-label={chartSummary} role="img">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsActivityDemo} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
                <defs><linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-fill-from)" /><stop offset="100%" stopColor="var(--chart-fill-to)" /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} tick={{ fill: 'var(--chart-axis)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} width={48} tick={{ fill: 'var(--chart-axis)', fontSize: 12 }} tickFormatter={(value) => new Intl.NumberFormat(undefined, { notation: 'compact' }).format(value)} />
                <Tooltip cursor={{ stroke: 'var(--chart-grid)', strokeWidth: 1 }} content={<SavingsTooltip />} />
                <Area type="monotone" dataKey="saved" stroke="var(--chart-line)" strokeWidth={2.5} fill="url(#savingsFill)" activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--surface)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <aside className="quick-actions-panel">
          <div className="section-heading"><div><h2>Quick actions</h2><p>Common tasks</p></div></div>
          <div className="quick-actions-list">
            <button type="button" onClick={() => navigate('/dashboard/goals/1')}><span><Plus size={18} /></span><div><strong>Add money</strong><small>Fund a savings goal</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => setCreateGoalOpen(true)}><span><Goal size={18} /></span><div><strong>Create goal</strong><small>Start a new target</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => navigate('/dashboard/goals/1')}><span><ArrowDownLeft size={18} /></span><div><strong>Withdraw</strong><small>Open a goal first</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => navigate('/dashboard/converter')}><span><Calculator size={18} /></span><div><strong>Convert currency</strong><small>Check an indicative rate</small></div><ArrowRight size={17} /></button>
          </div>
        </aside>
      </section>

      <section className="dashboard-section goals-overview-section">
        <div className="section-heading"><div><h2>Your savings goals</h2><p>Progress across your active targets</p></div><Link className="text-button" to="/dashboard/goals">View all <ArrowRight size={16} /></Link></div>
        <div className="goals-grid compact-goals-grid">
          {savingsGoalsDemo.map((goal) => (
            <Link className="dashboard-goal-card" key={goal.id} to={`/dashboard/goals/${goal.id}`}>
              <div className="goal-card-heading"><span className="goal-card-icon"><Target size={18} /></span><span className="goal-percentage">{goal.progress}%</span></div>
              <h3>{goal.name}</h3>
              <p><strong>{formatCurrency(goal.saved, demoUser.preferredCurrency)}</strong> of {formatCurrency(goal.target, demoUser.preferredCurrency)}</p>
              <ProgressBar value={goal.progress} label={`${goal.progress}% saved`} />
              <div className="dashboard-goal-meta"><span>{formatCurrency(goal.target - goal.saved, demoUser.preferredCurrency)} remaining</span><span>{goal.targetDate}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section transactions-section">
        <div className="section-heading"><div><h2>Recent transactions</h2><p>Your latest account activity</p></div><Link className="text-button" to="/dashboard/transactions">View all <ArrowRight size={16} /></Link></div>
        <div className="transactions-list compact-transaction-list">
          {recentTransactionsDemo.slice(0, 4).map((transaction) => {
            const TransactionIcon = transaction.type === 'Deposit' ? ArrowDownLeft : ArrowUpRight
            return <article className="transaction-row" key={transaction.id}><span className={`transaction-mark ${transaction.type === 'Withdrawal' ? 'is-withdrawal' : ''}`} aria-hidden="true"><TransactionIcon size={18} /></span><div className="transaction-name"><strong>{transaction.description}</strong><span>{transaction.goal} · {transaction.date}</span></div><div className="transaction-row-value"><strong className={`transaction-amount ${transaction.type === 'Withdrawal' ? 'is-withdrawal' : ''}`}>{transactionAmount(transaction.type, transaction.amount)}</strong><span className={`transaction-status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></div></article>
          })}
        </div>
      </section>
      {createGoalOpen && <CreateGoalModal onClose={() => setCreateGoalOpen(false)} />}
    </DashboardLayout>
  )
}

export default DashboardPage
