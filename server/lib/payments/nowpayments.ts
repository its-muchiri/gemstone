import { timingSafeEqual } from 'crypto'

const API_KEY = process.env.NOWPAYMENTS_API_KEY!
const isSandbox = process.env.NOWPAYMENTS_SANDBOX === 'true'
const API_BASE = isSandbox
  ? 'https://api-sandbox.nowpayments.io/v1'
  : (process.env.NOWPAYMENTS_API_BASE || 'https://api.nowpayments.io/v1')

interface NowPaymentsInvoiceRequest {
  price_amount: number
  price_currency: string
  order_id: string
  order_description: string
  ipn_callback_url: string
  success_url: string
  cancel_url: string
}

interface NowPaymentsInvoiceResponse {
  id: number
  order_id: string
  invoice_id: number
  invoice_url: string
  status: string
}

export async function createNowPaymentsInvoice(
  params: NowPaymentsInvoiceRequest
): Promise<NowPaymentsInvoiceResponse> {
  if (!API_KEY) {
    throw new Error('NOWPAYMENTS_API_KEY is not configured')
  }

  const res = await fetch(`${API_BASE}/invoice`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`NowPayments API error (${res.status}): ${error}`)
  }

  return res.json()
}

export async function verifyNowPaymentsSignature(
  body: Record<string, unknown>,
  signature: string,
  secret: string
): Promise<boolean> {
  const sortedKeys = Object.keys(body).sort()
  const sortedObj: Record<string, unknown> = {}
  for (const key of sortedKeys) {
    sortedObj[key] = body[key]
  }
  const sortedString = JSON.stringify(sortedObj)

  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const msgData = encoder.encode(sortedString)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  )
  const sigBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  const computedSigHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const computedBuf = Buffer.from(computedSigHex, 'utf8')
  const receivedBuf = Buffer.from(signature, 'utf8')

  if (computedBuf.length !== receivedBuf.length) {
    return false
  }

  return timingSafeEqual(computedBuf, receivedBuf)
}
