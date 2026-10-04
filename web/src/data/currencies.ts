export type Currency = { code: string; name: string; region: string }

// ISO-style currency metadata, ready for future FROM/TO conversion controls.
export const currencies: Currency[] = [
  ['USD', 'US Dollar', 'Major / Global'], ['EUR', 'Euro', 'Major / Global'], ['GBP', 'British Pound', 'Major / Global'],
  ['JPY', 'Japanese Yen', 'Major / Global'], ['CHF', 'Swiss Franc', 'Major / Global'], ['CAD', 'Canadian Dollar', 'Major / Global'],
  ['AUD', 'Australian Dollar', 'Major / Global'], ['NZD', 'New Zealand Dollar', 'Major / Global'], ['CNY', 'Chinese Yuan', 'Major / Global'],
  ['HKD', 'Hong Kong Dollar', 'Major / Global'], ['SGD', 'Singapore Dollar', 'Major / Global'],
  ['UGX', 'Ugandan Shilling', 'Africa'], ['KES', 'Kenyan Shilling', 'Africa'], ['TZS', 'Tanzanian Shilling', 'Africa'],
  ['RWF', 'Rwandan Franc', 'Africa'], ['NGN', 'Nigerian Naira', 'Africa'], ['GHS', 'Ghanaian Cedi', 'Africa'],
  ['ZAR', 'South African Rand', 'Africa'], ['EGP', 'Egyptian Pound', 'Africa'], ['MAD', 'Moroccan Dirham', 'Africa'],
  ['ETB', 'Ethiopian Birr', 'Africa'], ['ZMW', 'Zambian Kwacha', 'Africa'], ['BWP', 'Botswana Pula', 'Africa'],
  ['MUR', 'Mauritian Rupee', 'Africa'], ['XOF', 'West African CFA Franc', 'Africa'], ['XAF', 'Central African CFA Franc', 'Africa'],
  ['INR', 'Indian Rupee', 'Asia / Middle East'], ['PKR', 'Pakistani Rupee', 'Asia / Middle East'], ['BDT', 'Bangladeshi Taka', 'Asia / Middle East'],
  ['AED', 'UAE Dirham', 'Asia / Middle East'], ['SAR', 'Saudi Riyal', 'Asia / Middle East'], ['QAR', 'Qatari Riyal', 'Asia / Middle East'],
  ['ILS', 'Israeli New Shekel', 'Asia / Middle East'], ['TRY', 'Turkish Lira', 'Asia / Middle East'], ['KRW', 'South Korean Won', 'Asia / Middle East'],
  ['IDR', 'Indonesian Rupiah', 'Asia / Middle East'], ['MYR', 'Malaysian Ringgit', 'Asia / Middle East'], ['THB', 'Thai Baht', 'Asia / Middle East'],
  ['PHP', 'Philippine Peso', 'Asia / Middle East'], ['VND', 'Vietnamese Dong', 'Asia / Middle East'],
  ['MXN', 'Mexican Peso', 'Americas'], ['BRL', 'Brazilian Real', 'Americas'], ['ARS', 'Argentine Peso', 'Americas'],
  ['CLP', 'Chilean Peso', 'Americas'], ['COP', 'Colombian Peso', 'Americas'], ['PEN', 'Peruvian Sol', 'Americas'],
].map(([code, name, region]) => ({ code, name, region }))
