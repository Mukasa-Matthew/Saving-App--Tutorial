import { useMemo, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { recentTransactionsDemo } from '../data/dashboardDemoData'
import { demoUser } from '../data/demoUser'
import { formatCurrency } from '../utils/currency'
import { ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react'

function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [goal, setGoal] = useState('All')
  const [status, setStatus] = useState('All')

  const goalOptions = [...new Set(recentTransactionsDemo.map((transaction) => transaction.goal))]
  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase()
    return recentTransactionsDemo.filter((transaction) => {
      const matchesSearch = !query || [transaction.description, transaction.goal, transaction.method, transaction.reference]
        .some((value) => value.toLowerCase().includes(query))
      return matchesSearch
        && (type === 'All' || transaction.type === type)
        && (goal === 'All' || transaction.goal === goal)
        && (status === 'All' || transaction.status === status)
    })
  }, [search, type, goal, status])

  const successfulDeposits = recentTransactionsDemo
    .filter((transaction) => transaction.type === 'Deposit' && transaction.status === 'Successful')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const successfulWithdrawals = recentTransactionsDemo
    .filter((transaction) => transaction.type === 'Withdrawal' && transaction.status === 'Successful')
    .reduce((sum, transaction) => sum + transaction.amount, 0)
  const thisMonth = recentTransactionsDemo.filter((transaction) => transaction.date.startsWith('Oct')).length
  const pending = recentTransactionsDemo.filter((transaction) => transaction.status === 'Pending').length

  function clearFilters() {
    setSearch('')
    setType('All')
    setGoal('All')
    setStatus('All')
  }

  return (
    <DashboardLayout>
      <section className="transactions-heading">
        <p className="dashboard-kicker">Money movement</p>
        <h1>Transactions</h1>
        <p>Review demonstration deposits and withdrawals across your savings goals.</p>
      </section>

      <section className="transaction-summary-grid" aria-label="Transaction summary">
        <article><span>Total deposits</span><strong>{formatCurrency(successfulDeposits, demoUser.preferredCurrency)}</strong><small>Successful deposits</small></article>
        <article><span>Total withdrawals</span><strong>{formatCurrency(successfulWithdrawals, demoUser.preferredCurrency)}</strong><small>Successful withdrawals</small></article>
        <article><span>This month</span><strong>{thisMonth}</strong><small>October transactions</small></article>
        <article><span>Pending</span><strong>{pending}</strong><small>Awaiting completion</small></article>
      </section>

      <section className="transaction-history">
        <div className="section-heading"><div><p className="dashboard-kicker">All activity</p><h2>Transaction history</h2></div><span className="result-count">{filteredTransactions.length} results</span></div>
        <div className="transaction-filters">
          <label className="search-control"><span className="sr-only">Search transactions</span><Search size={18} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search goal, method, or reference" /></label>
          <label><span className="sr-only">Filter by type</span><select value={type} onChange={(event) => setType(event.target.value)}><option>All</option><option>Deposit</option><option>Withdrawal</option></select></label>
          <label><span className="sr-only">Filter by goal</span><select value={goal} onChange={(event) => setGoal(event.target.value)}><option>All</option>{goalOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Successful</option><option>Pending</option><option>Failed</option></select></label>
        </div>

        {filteredTransactions.length ? (
          <div className="transaction-table-wrap">
            <table className="transaction-table">
              <thead><tr><th>Date</th><th>Type</th><th>Goal</th><th>Payment method</th><th>Reference</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Date">{transaction.date}</td>
                    <td data-label="Type"><span className={`type-badge ${transaction.type.toLowerCase()}`}>{transaction.type === 'Deposit' ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}{transaction.type}</span></td>
                    <td data-label="Goal"><strong>{transaction.goal}</strong></td>
                    <td data-label="Payment">{transaction.method}</td>
                    <td data-label="Reference"><code>{transaction.reference}</code></td>
                    <td data-label="Amount" className={`table-amount ${transaction.type === 'Withdrawal' ? 'is-withdrawal' : ''}`}>{transaction.type === 'Deposit' ? '+' : '-'}{formatCurrency(transaction.amount, demoUser.preferredCurrency)}</td>
                    <td data-label="Status"><span className={`transaction-status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="transaction-empty"><Search size={24} aria-hidden="true" /><h3>No transactions found</h3><p>Try changing your search or filters.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>
        )}
      </section>
    </DashboardLayout>
  )
}

export default TransactionsPage
