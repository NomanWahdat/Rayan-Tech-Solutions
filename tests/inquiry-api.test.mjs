import { test } from 'node:test'
import assert from 'node:assert/strict'
import inquiry from '../netlify/functions/inquiry.mjs'

const brief = {
  name: 'Inquiry test',
  company: 'Example company',
  email: 'sender@example.com',
  phone: '',
  type: 'Custom software',
  industry: 'Education',
  budget: 'To be discussed',
  method: 'Email',
  description: 'A connected administration workspace for staff.',
  website: '',
}
const request = (body = brief, headers = {}) =>
  new Request('https://rayan-tech-solution.tech/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://rayan-tech-solution.tech',
      ...headers,
    },
    body: JSON.stringify(body),
  })

test('Inquiry API validates submissions, protects the recipient, and reports provider failures honestly', async () => {
  const names = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']
  const previous = Object.fromEntries(
    names.map((name) => [name, process.env[name]])
  )
  const originalFetch = globalThis.fetch
  const calls = []
  try {
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_FROM_EMAIL
    delete process.env.CONTACT_TO_EMAIL
    globalThis.fetch = async (url, options) => {
      calls.push({ url, options })
      return Response.json({ id: 'test-message-id' })
    }
    assert.equal((await inquiry(request())).status, 503)
    assert.equal(calls.length, 0)
    assert.equal(
      (
        await inquiry(
          request(brief, { Origin: 'https://another-site.example' })
        )
      ).status,
      403
    )
    assert.equal(
      (await inquiry(request({ ...brief, email: 'broken-address' }))).status,
      400
    )
    assert.equal(
      (await inquiry(request({ ...brief, description: 'Too short' }))).status,
      400
    )
    assert.equal(
      (await inquiry(request({ ...brief, website: 'spam.example' }))).status,
      400
    )
    assert.equal(
      (await inquiry(request({ ...brief, method: 'Phone call' }))).status,
      400
    )
    assert.equal(
      (
        await inquiry(
          request({ ...brief, type: 'Project\r\nBcc: other@example.com' })
        )
      ).status,
      400
    )
    assert.equal(
      (
        await inquiry(
          new Request('https://rayan-tech-solution.tech/api/inquiry')
        )
      ).status,
      405
    )
    process.env.RESEND_API_KEY = 'mock-provider-key'
    process.env.CONTACT_FROM_EMAIL = 'Rayan website <inquiries@example.com>'
    const response = await inquiry(
      request({ ...brief, to: 'attacker@example.com' })
    )
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true })
    const payload = JSON.parse(calls[0].options.body)
    assert.deepEqual(payload.to, ['nomanwahdat@gmail.com'])
    assert.equal(payload.reply_to, brief.email)
    assert.ok(
      payload.text.includes(brief.description) &&
        payload.text.includes('Industry: Education')
    )
    assert.equal(calls[0].url, 'https://api.resend.com/emails')
    assert.match(
      calls[0].options.headers['Idempotency-Key'],
      /^inquiry-[a-f0-9]{64}$/
    )
    globalThis.fetch = async () =>
      Response.json({ message: 'Provider rejected request' }, { status: 403 })
    assert.equal((await inquiry(request())).status, 502)
    globalThis.fetch = async () => {
      throw new Error('Provider unavailable')
    }
    assert.equal((await inquiry(request())).status, 502)
  } finally {
    globalThis.fetch = originalFetch
    for (const name of names) {
      if (previous[name] === undefined) delete process.env[name]
      else process.env[name] = previous[name]
    }
  }
})
