import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import { recentTransactionsDemo, savingsGoalsDemo } from '../data/dashboardDemoData'
import { demoUser } from '../data/demoUser'
import { countries } from '../data/countries'
import { formatCurrency } from '../utils/currency'
import ProgressBar from '../components/ui/ProgressBar'
import Modal from '../components/ui/Modal'
import { ArrowDownLeft, ArrowLeft, ArrowUpRight, Plus, Target } from 'lucide-react'

type WithdrawalErrors = Partial<Record<'amount' | 'method' | 'phone' | 'accountHolder' | 'bankName' | 'accountNumber', string>>

function GoalDetailsPage() {
  const { goalId } = useParams()
  const goal = savingsGoalsDemo.find((item) => String(item.id) === goalId)
  const [depositOpen, setDepositOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [withdrawalOpen, setWithdrawalOpen] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState('')
  const [withdrawalSubmitted, setWithdrawalSubmitted] = useState(false)
  const [withdrawalErrors, setWithdrawalErrors] = useState<WithdrawalErrors>({})

  if (!goal) {
    return (
      <DashboardLayout>
        <section className="not-found-state">
          <span aria-hidden="true">?</span><h1>Goal not found</h1>
          <p>We couldn’t find a savings goal with that ID.</p>
          <Link className="primary-action" to="/dashboard/goals">Back to Savings Goals</Link>
        </section>
      </DashboardLayout>
    )
  }

  const remaining = goal.target - goal.saved
  const savedAmount = goal.saved
  const goalTransactions = recentTransactionsDemo.filter((transaction) => transaction.goalId === goal.id)

  function closeDeposit() {
    setDepositOpen(false)
    setPaymentMethod('')
    setFormError('')
    setSubmitted(false)
  }

  function handleDeposit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const amount = Number(formData.get('amount'))
    const phone = String(formData.get('phone') ?? '').replace(/[\s-]/g, '')

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError('Enter an amount greater than zero.')
      return
    }
    if (amount > remaining) {
      setFormError(`The deposit cannot exceed the ${formatCurrency(remaining, demoUser.preferredCurrency)} remaining.`)
      return
    }
    if (!paymentMethod) {
      setFormError('Choose a payment method.')
      return
    }
    if (paymentMethod === 'mobile-money' && !/^\+[1-9]\d{7,14}$/.test(phone)) {
      setFormError('Enter a valid international phone number, including its calling code (for example, +254 712 345678).')
      return
    }

    form.reset()
    setFormError('')
    setSubmitted(true)
  }

  function closeWithdrawal() {
    setWithdrawalOpen(false)
    setPayoutMethod('')
    setWithdrawalSubmitted(false)
    setWithdrawalErrors({})
  }

  function handleWithdrawal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const amount = Number(data.get('withdrawalAmount'))
    const errors: WithdrawalErrors = {}

    if (!Number.isFinite(amount) || amount <= 0) errors.amount = 'Enter an amount greater than zero.'
    else if (amount > savedAmount) errors.amount = `You can withdraw up to ${formatCurrency(savedAmount, demoUser.preferredCurrency)} from this goal.`
    if (!payoutMethod) errors.method = 'Choose a payout method.'

    if (payoutMethod === 'mobile-money') {
      const phone = String(data.get('payoutPhone') ?? '').replace(/[\s()-]/g, '')
      if (!/^\d{6,14}$/.test(phone)) errors.phone = 'Enter a valid local phone number with 6 to 14 digits.'
    }
    if (payoutMethod === 'bank-account') {
      if (String(data.get('accountHolder') ?? '').trim().length < 2) errors.accountHolder = 'Enter the account holder’s name.'
      if (String(data.get('bankName') ?? '').trim().length < 2) errors.bankName = 'Enter the bank name.'
      if (String(data.get('accountNumber') ?? '').trim().length < 4) errors.accountNumber = 'Enter a valid account number.'
    }

    if (Object.keys(errors).length) {
      setWithdrawalErrors(errors)
      return
    }

    form.reset()
    setWithdrawalErrors({})
    setWithdrawalSubmitted(true)
  }

  return (
    <DashboardLayout>
      <Link className="back-link" to="/dashboard/goals"><ArrowLeft size={16} /> Savings Goals</Link>
      <section className="details-heading">
        <div className="details-title"><span className="goal-card-icon"><Target size={20} /></span><div><div className="title-status"><h1>{goal.name}</h1><span className={`status-badge ${goal.status === 'On track' ? 'on-track' : ''}`}>{goal.status}</span></div><p>{goal.description}</p></div></div>
        <div className="details-actions"><button className="withdraw-button" type="button" onClick={() => setWithdrawalOpen(true)}><ArrowUpRight size={18} /> Withdraw</button><button className="create-goal-button" type="button" onClick={() => setDepositOpen(true)}><Plus size={18} /> Add Money</button></div>
      </section>

      <section className="goal-detail-card">
        <div className="detail-progress-copy"><div><span>Saved so far</span><strong>{formatCurrency(goal.saved, demoUser.preferredCurrency)}</strong></div><div><span>Target amount</span><strong>{formatCurrency(goal.target, demoUser.preferredCurrency)}</strong></div><div><span>Remaining</span><strong>{formatCurrency(remaining, demoUser.preferredCurrency)}</strong></div></div>
        <div className="detail-progress-label"><strong>{goal.progress}% complete</strong><span>{formatCurrency(remaining, demoUser.preferredCurrency)} to go</span></div>
        <ProgressBar value={goal.progress} label={`${goal.progress}% saved`} size="large" />
        <div className="goal-dates"><span>Created <strong>{goal.createdDate}</strong></span><span>Target date <strong>{goal.targetDate}</strong></span></div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading"><div><p className="dashboard-kicker">Goal activity</p><h2>Recent transactions</h2></div></div>
        <div className="transactions-list">
          {goalTransactions.length ? goalTransactions.map((transaction) => (
            <article className="transaction-row detail-transaction" key={transaction.id}>
              <span className={`transaction-mark ${transaction.type === 'Withdrawal' ? 'is-withdrawal' : ''}`} aria-hidden="true">{transaction.type === 'Deposit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span>
              <div className="transaction-name"><strong>{transaction.description}</strong><span>{transaction.method}</span></div>
              <time>{transaction.date}</time><strong className={`transaction-amount ${transaction.type === 'Withdrawal' ? 'is-withdrawal' : ''}`}>{transaction.type === 'Deposit' ? '+' : '-'}{formatCurrency(transaction.amount, demoUser.preferredCurrency)}</strong>
            </article>
          )) : <p className="empty-transactions">No demonstration transactions for this goal.</p>}
        </div>
      </section>

      {depositOpen && (
        <Modal labelledBy="deposit-title" onClose={closeDeposit}>
            <div className="modal-heading"><div><p className="dashboard-kicker">Frontend simulation</p><h2 id="deposit-title">Add money to {goal.name}</h2></div><button type="button" onClick={closeDeposit} aria-label="Close deposit dialog">×</button></div>
            {submitted ? (
              <div className="goal-success" role="status"><span aria-hidden="true">✓</span><h3>Deposit simulated</h3><p>No money was moved and your goal balance has not changed.</p><button className="submit-button" type="button" onClick={closeDeposit}>Done</button></div>
            ) : (
              <form className="goal-form" onSubmit={handleDeposit} noValidate>
                <label className="field"><span>Amount</span><input name="amount" type="number" min="0.01" max={remaining} step="0.01" inputMode="decimal" required /></label>
                <label className="field"><span>Payment method</span><select name="paymentMethod" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} required><option value="">Select a demonstration method</option><option value="mobile-money">Mobile Money</option><option value="bank-transfer">Bank transfer</option></select></label>
                {paymentMethod === 'mobile-money' && <label className="field"><span>Mobile Money phone number</span><input name="phone" type="tel" inputMode="tel" placeholder="+254 712 345678" required /></label>}
                {formError && <p className="form-error" role="alert">{formError}</p>}
                <p className="simulation-note">Demonstration only. This form will not initiate a real payment.</p>
                <div className="modal-actions"><button className="cancel-button" type="button" onClick={closeDeposit}>Cancel</button><button className="submit-button" type="submit">Continue</button></div>
              </form>
            )}
        </Modal>
      )}

      {withdrawalOpen && (
        <Modal labelledBy="withdrawal-title" onClose={closeWithdrawal} className="withdrawal-modal">
            <div className="modal-heading"><div><p className="dashboard-kicker">Frontend simulation</p><h2 id="withdrawal-title">Withdraw from {goal.name}</h2></div><button type="button" onClick={closeWithdrawal} aria-label="Close withdrawal dialog">×</button></div>
            {withdrawalSubmitted ? (
              <div className="goal-success withdrawal-success" role="status"><span aria-hidden="true">✓</span><h3>Withdrawal simulated</h3><p>No money was moved, and neither your goal balance nor transaction history has changed.</p><button className="submit-button" type="button" onClick={closeWithdrawal}>Done</button></div>
            ) : (
              <form className="goal-form" onSubmit={handleWithdrawal} noValidate>
                <label className={`field ${withdrawalErrors.amount ? 'has-error' : ''}`}><span>Withdrawal amount</span><input name="withdrawalAmount" type="number" min="0.01" max={goal.saved} step="0.01" inputMode="decimal" aria-describedby={withdrawalErrors.amount ? 'withdrawal-amount-error' : undefined} required />{withdrawalErrors.amount && <small className="field-error" id="withdrawal-amount-error">{withdrawalErrors.amount}</small>}</label>
                <label className={`field ${withdrawalErrors.method ? 'has-error' : ''}`}><span>Payout method</span><select name="payoutMethod" value={payoutMethod} onChange={(event) => { setPayoutMethod(event.target.value); setWithdrawalErrors({}) }} required><option value="">Select a demonstration method</option><option value="mobile-money">Mobile Money</option><option value="bank-account">Bank Account</option></select>{withdrawalErrors.method && <small className="field-error">{withdrawalErrors.method}</small>}</label>

                {payoutMethod === 'mobile-money' && (
                  <label className={`field ${withdrawalErrors.phone ? 'has-error' : ''}`}><span>Destination phone number</span><span className="international-phone"><select name="payoutCallingCode" defaultValue={demoUser.callingCode} aria-label="International calling code">{countries.map((country) => <option value={country.callingCode} key={country.code}>{country.callingCode} · {country.code}</option>)}</select><input name="payoutPhone" type="tel" inputMode="tel" placeholder="Local phone number" required /></span>{withdrawalErrors.phone && <small className="field-error">{withdrawalErrors.phone}</small>}</label>
                )}

                {payoutMethod === 'bank-account' && (
                  <div className="payout-fields">
                    <label className={`field ${withdrawalErrors.accountHolder ? 'has-error' : ''}`}><span>Account holder name</span><input name="accountHolder" type="text" autoComplete="name" required />{withdrawalErrors.accountHolder && <small className="field-error">{withdrawalErrors.accountHolder}</small>}</label>
                    <label className={`field ${withdrawalErrors.bankName ? 'has-error' : ''}`}><span>Bank name</span><input name="bankName" type="text" required />{withdrawalErrors.bankName && <small className="field-error">{withdrawalErrors.bankName}</small>}</label>
                    <label className={`field ${withdrawalErrors.accountNumber ? 'has-error' : ''}`}><span>Account number</span><input name="accountNumber" type="text" inputMode="numeric" autoComplete="off" required />{withdrawalErrors.accountNumber && <small className="field-error">{withdrawalErrors.accountNumber}</small>}</label>
                  </div>
                )}

                <label className="field"><span>Note or reason <small>(optional)</small></span><textarea name="withdrawalNote" rows={3} maxLength={180} placeholder="Add a note for your records" /></label>
                <p className="simulation-note">Demonstration only. Continuing will not initiate a payout or change this goal.</p>
                <div className="modal-actions"><button className="cancel-button" type="button" onClick={closeWithdrawal}>Cancel</button><button className="submit-button" type="submit">Continue</button></div>
              </form>
            )}
        </Modal>
      )}
    </DashboardLayout>
  )
}

export default GoalDetailsPage
