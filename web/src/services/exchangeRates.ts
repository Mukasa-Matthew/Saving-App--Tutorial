export const FRANKFURTER_API_BASE_URL = 'https://api.frankfurter.dev/v2'

export type ExchangeRate = {
  base: string
  quote: string
  rate: number
  date: string
}

type FrankfurterRateResponse = {
  base?: string
  quote?: string
  rate?: number
  date?: string
  message?: string
}

export async function getLatestExchangeRate(base: string, quote: string): Promise<ExchangeRate> {
  const endpoint = `${FRANKFURTER_API_BASE_URL}/rate/${encodeURIComponent(base.toLowerCase())}/${encodeURIComponent(quote.toLowerCase())}`
  let response: Response

  try {
    response = await fetch(endpoint, { headers: { Accept: 'application/json' } })
  } catch {
    throw new Error('The exchange-rate service could not be reached. Check your connection and try again.')
  }

  const data = await response.json().catch(() => null) as FrankfurterRateResponse | null
  if (!response.ok) {
    throw new Error(data?.message || 'The exchange-rate service could not complete this request.')
  }
  if (!data?.base || !data.quote || !data.date || typeof data.rate !== 'number' || !Number.isFinite(data.rate)) {
    throw new Error('The exchange-rate service returned an unexpected response. Please try again.')
  }

  return { base: data.base, quote: data.quote, rate: data.rate, date: data.date }
}
