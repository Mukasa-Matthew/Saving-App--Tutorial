import { useState, type FormEvent } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { currencies } from '../data/currencies'
import { demoUser } from '../data/demoUser'
import { getLatestExchangeRate, type ExchangeRate } from '../services/exchangeRates'
import { formatCurrency } from '../utils/currency'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { ArrowLeftRight, TrendingUp } from 'lucide-react'

type ConversionResult = ExchangeRate & { amount: number; convertedAmount: number }

function CurrencyConverterPage() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState(demoUser.preferredCurrency)
  const [toCurrency, setToCurrency] = useState(demoUser.preferredCurrency === 'USD' ? 'EUR' : 'USD')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function convert(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter an amount greater than zero.')
      setResult(null)
      return
    }
    if (!fromCurrency || !toCurrency) {
      setError('Select both a FROM and TO currency.')
      setResult(null)
      return
    }
    if (fromCurrency === toCurrency) {
      setError('Choose two different currencies to retrieve an exchange rate.')
      setResult(null)
      return
    }

    setLoading(true)
    setError('')
    try {
      const exchangeRate = await getLatestExchangeRate(fromCurrency, toCurrency)
      setResult({ ...exchangeRate, amount: numericAmount, convertedAmount: numericAmount * exchangeRate.rate })
    } catch (conversionError) {
      setError(conversionError instanceof Error ? conversionError.message : 'The conversion could not be completed.')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  function swapCurrencies() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
    setError('')
  }

  return (
    <DashboardLayout>
      <section className="converter-heading">
        <p className="dashboard-kicker">Plan across currencies</p>
        <h1>Currency Converter</h1>
        <p>Estimate values using the latest available reference exchange rate.</p>
      </section>

      <div className="converter-layout">
        <section className="converter-card">
          <form onSubmit={convert} noValidate>
            <label className="field"><span>Amount</span><input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} min="0.01" step="any" inputMode="decimal" required /></label>
            <div className="currency-pair">
              <label className="field"><span>From</span><select value={fromCurrency} onChange={(event) => { setFromCurrency(event.target.value); setResult(null) }}>{currencies.map((currency) => <option value={currency.code} key={currency.code}>{currency.code} — {currency.name}</option>)}</select></label>
              <button className="swap-button" type="button" onClick={swapCurrencies} aria-label="Swap FROM and TO currencies"><ArrowLeftRight size={20} /></button>
              <label className="field"><span>To</span><select value={toCurrency} onChange={(event) => { setToCurrency(event.target.value); setResult(null) }}>{currencies.map((currency) => <option value={currency.code} key={currency.code}>{currency.code} — {currency.name}</option>)}</select></label>
            </div>
            {error && <div className="converter-error" role="alert"><strong>Conversion unavailable</strong><p>{error}</p><button type="button" onClick={() => void convert()}>Try again</button></div>}
            <button className="converter-submit" type="submit" disabled={loading}>{loading ? <><LoadingSpinner /> Getting latest rate…</> : 'Convert currency'}</button>
          </form>
        </section>

        <section className={`conversion-result ${result ? 'has-result' : ''}`} aria-live="polite" aria-busy={loading}>
          {loading ? (
            <div className="result-placeholder"><LoadingSpinner size="large" tone="brand" /><h2>Fetching the latest rate</h2><p>This usually takes only a moment.</p></div>
          ) : result ? (
            <div className="result-content">
              <p className="result-label">Indicative conversion</p>
              <span>{formatCurrency(result.amount, result.base)}</span>
              <strong>{formatCurrency(result.convertedAmount, result.quote)}</strong>
              <div className="rate-details"><p><span>Exchange rate used</span><strong>1 {result.base} = {new Intl.NumberFormat(undefined, { maximumSignificantDigits: 7 }).format(result.rate)} {result.quote}</strong></p><p><span>Latest rate date</span><strong>{new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${result.date}T00:00:00Z`))}</strong></p></div>
              <p className="rate-disclaimer">Reference estimate only. This is not a guaranteed banking or payment rate and does not affect your GoalSave balances.</p>
            </div>
          ) : (
            <div className="result-placeholder"><span className="converter-symbol" aria-hidden="true"><TrendingUp size={24} /></span><h2>Your conversion will appear here</h2><p>Enter an amount and choose two currencies to retrieve the latest available rate.</p></div>
          )}
        </section>
      </div>
      <p className="rate-source">Exchange-rate data provided by Frankfurter from central banks and official sources. No conversion is saved.</p>
    </DashboardLayout>
  )
}

export default CurrencyConverterPage
