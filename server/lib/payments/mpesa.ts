const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!
const SHORTCODE = process.env.MPESA_SHORTCODE || '174379'
const PASSKEY = process.env.MPESA_PASSKEY!
const ENV = process.env.MPESA_ENV || 'sandbox'

const BASE_URL =
  ENV === 'production'
    ? process.env.MPESA_BASE_URL_PRODUCTION || 'https://api.safaricom.co.ke'
    : process.env.MPESA_BASE_URL_SANDBOX || 'https://sandbox.safaricom.co.ke'

const APP_URL = process.env.APP_URL || 'http://localhost:3001'

let cachedToken: { token: string; expiresAt: number } | null = null

export async function getMpesaAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error(`M-Pesa OAuth failed (${res.status})`)
  }

  const data = await res.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + 3500 * 1000,
  }

  return cachedToken.token
}

function getPassword(shortcode: string, passkey: string, timestamp: string): string {
  const data = `${shortcode}${passkey}${timestamp}`
  return Buffer.from(data).toString('base64')
}

function getTimestamp(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return `${y}${m}${d}${h}${min}${s}`
}

export function normalizeKenyanPhone(phone: string): string | null {
  let cleaned = phone.replace(/[\s\-()]/g, '')
  if (cleaned.startsWith('+254')) {
    cleaned = cleaned.slice(1)
  } else if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.slice(1)
  }
  if (/^254\d{9}$/.test(cleaned)) {
    return cleaned
  }
  return null
}

export interface StkPushRequest {
  amount: number
  phoneNumber: string
  accountReference: string
  transactionDesc: string
}

export interface StkPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

export async function initiateStkPush(
  params: StkPushRequest
): Promise<StkPushResponse> {
  const token = await getMpesaAccessToken()
  const timestamp = getTimestamp()
  const password = getPassword(SHORTCODE, PASSKEY, timestamp)

  const res = await fetch(
    `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: params.amount,
        PartyA: params.phoneNumber,
        PartyB: SHORTCODE,
        PhoneNumber: params.phoneNumber,
        CallBackURL: `${APP_URL}/api/webhooks/mpesa`,
        AccountReference: params.accountReference,
        TransactionDesc: params.transactionDesc,
      }),
    }
  )

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`M-Pesa STK Push failed (${res.status}): ${error}`)
  }

  return res.json()
}
