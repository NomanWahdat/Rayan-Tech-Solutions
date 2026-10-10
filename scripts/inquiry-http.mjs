import inquiry from '../netlify/functions/inquiry.mjs'

export async function handleInquiry(request, response) {
  let size = 0
  const chunks = []
  for await (const chunk of request) {
    size += chunk.length
    if (size > 15000) {
      response.writeHead(413, { 'Content-Type': 'application/json' })
      response.end(
        JSON.stringify({
          success: false,
          error: 'Please shorten your project description.',
        })
      )
      return
    }
    chunks.push(chunk)
  }
  const result = await inquiry(
    new Request('http://' + request.headers.host + '/api/inquiry', {
      method: request.method,
      headers: request.headers,
      ...(request.method === 'POST' ? { body: Buffer.concat(chunks) } : {}),
    })
  )
  response.writeHead(result.status, Object.fromEntries(result.headers))
  response.end(await result.text())
}
