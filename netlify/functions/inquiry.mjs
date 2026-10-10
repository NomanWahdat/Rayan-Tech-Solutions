import { createHash } from 'node:crypto'

export const config = {
  path: '/api/inquiry',
  rateLimit: { windowLimit: 8, windowSize: 60, aggregateBy: ['ip'] },
}
const limits = {
  name: 100,
  company: 150,
  email: 254,
  phone: 40,
  type: 150,
  industry: 150,
  budget: 100,
  description: 5000,
  method: 20,
  website: 200,
}
const reply = (status, body) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export default async function inquiry(request) {
  if (request.method !== 'POST')
    return reply(405, {
      success: false,
      error: 'Use the project inquiry form to send a request.',
    })
  const origin = request.headers.get('origin')
  const allowed = new Set([
    new URL(request.url).origin,
    'https://rayan-tech-solution.tech',
    'https://www.rayan-tech-solution.tech',
  ])
  if (origin && !allowed.has(origin))
    return reply(403, {
      success: false,
      error: 'Please submit your inquiry from our website.',
    })
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply(415, { success: false, error: 'Invalid inquiry format.' })
  if (Number(request.headers.get('content-length')) > 15000)
    return reply(413, {
      success: false,
      error: 'Please shorten your project description.',
    })
  let form
  try {
    const raw = await request.text()
    if (raw.length > 15000)
      return reply(413, {
        success: false,
        error: 'Please shorten your project description.',
      })
    const input = JSON.parse(raw)
    if (!input || typeof input !== 'object' || Array.isArray(input))
      throw new Error('Invalid form')
    form = {}
    for (const [name, length] of Object.entries(limits)) {
      const value = input[name] ?? ''
      if (typeof value !== 'string' || value.length > length)
        throw new Error('Invalid field')
      form[name] = value.trim()
    }
  } catch {
    return reply(400, {
      success: false,
      error: 'Please check your project details and try again.',
    })
  }
  if (form.website)
    return reply(400, {
      success: false,
      error: 'Your inquiry could not be submitted.',
    })
  if (
    !form.name ||
    !form.type ||
    form.description.length < 20 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(form.email) ||
    /[\r\n]/.test(form.email + form.name + form.type) ||
    !['Email', 'Phone call'].includes(form.method) ||
    (form.method === 'Phone call' && form.phone.length < 7)
  ) {
    return reply(400, {
      success: false,
      error:
        'Please provide a valid name, email, project type, and description. Include your phone number when requesting a call.',
    })
  }
  const key = process.env.RESEND_API_KEY
  const sender = process.env.CONTACT_FROM_EMAIL
  // Server only: never imported by the website or included in a client response.
  const recipient = process.env.CONTACT_TO_EMAIL || 'nomanwahdat@gmail.com'
  if (!key || !sender)
    return reply(503, {
      success: false,
      error:
        'Email sending is temporarily unavailable. Your details are saved on this page; please try WhatsApp or retry later.',
    })
  const text = [
    'Project inquiry — Rayan Tech Solutions',
    ...Object.entries({
      Name: form.name,
      Company: form.company || 'Not specified',
      Email: form.email,
      'Phone / WhatsApp': form.phone || 'Not specified',
      'Project type': form.type,
      Industry: form.industry || 'Not specified',
      Budget: form.budget || 'To be discussed',
      'Preferred contact': form.method,
    }).map(([name, value]) => name + ': ' + value),
    '',
    'Project description:',
    form.description,
  ].join('\n')
  const id = createHash('sha256')
    .update(text + Math.floor(Date.now() / 600000))
    .digest('hex')
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Idempotency-Key': 'inquiry-' + id,
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: form.email,
        subject: 'Project inquiry: ' + form.type,
        text,
      }),
      signal: AbortSignal.timeout(12000),
    })
    const body = await response.json().catch(() => null)
    if (!response.ok || !body?.id)
      return reply(502, {
        success: false,
        error:
          'Email sending could not be confirmed. Please retry or send your brief on WhatsApp.',
      })
    return reply(200, { success: true })
  } catch {
    return reply(502, {
      success: false,
      error:
        'Email sending could not be confirmed. Please retry or send your brief on WhatsApp.',
    })
  }
}
